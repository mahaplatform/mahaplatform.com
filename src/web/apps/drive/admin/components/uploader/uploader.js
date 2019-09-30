import { CSSTransition } from 'react-transition-group'
import { connect } from 'react-redux'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import Progress from './progress'
import React from 'react'
import _ from 'lodash'

const ignored = ['.DS_Store','Thumbs.db']

class Uploader extends React.Component {

  static childContextTypes = {
    uploader: PropTypes.object
  }

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    files: PropTypes.array,
    progress: PropTypes.bool,
    token: PropTypes.string,
    onAdd: PropTypes.func,
    onCreate: PropTypes.func,
    onRemove: PropTypes.func,
    onToggle: PropTypes.func,
    onUpdate: PropTypes.func
  }

  browse = null
  drop = null
  resumable = null

  _handleAdd = this._handleAdd.bind(this)
  _handleBrowse = this._handleBrowse.bind(this)
  _handleCreate = this._handleCreate.bind(this)
  _handleFailure = this._handleFailure.bind(this)
  _handleProcessed = this._handleProcessed.bind(this)
  _handleProgress = this._handleProgress.bind(this)
  _handleRetry = this._handleRetry.bind(this)
  _handleToggle = this._handleToggle.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleUpload = this._handleUpload.bind(this)

  render() {
    const { files, progress } = this.props
    return (
      <div className="drive-uploader">
        <div className="drive-uploader-body" ref={ node => this.drop = node }>
          { this.props.children }
          <div ref={ node => this.browse = node } />
        </div>
        <CSSTransition in={ files.length > 0 } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="drive-uploader-footer" onClick={ this._handleToggle }>
            <i className="fa fa-circle-o-notch fa-spin" /> Uploading { files.length } files
          </div>
        </CSSTransition>
        <CSSTransition in={ progress } classNames="slideup" timeout={ 250 } mountOnEnter={ true } unmountOnExit={ true }>
          <Progress { ...this._getProgress() } />
        </CSSTransition>
      </div>
    )
  }

  componentDidMount() {
    const { token } = this.props
    this.resumable = new Resumable({
      target: '/api/admin/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    this.resumable.on('fileAdded', this._handleAdd)
    this.resumable.on('filesAdded', this._handleUpload)
    this.resumable.on('fileError', this._handleFailure)
    this.resumable.on('fileProgress', this._handleProgress)
    this.resumable.on('fileSuccess', this._handleSuccess)
    this.resumable.on('complete', this._handleCreate)
    this.resumable.assignBrowse(this.browse)
    this.resumable.assignDrop(this.drop)
  }

  componentDidUpdate(prevProps) {
    const { files } = this.props
    if(files.length < prevProps.files.length) {
      this._handleRemove(prevProps.files)
    }
  }

  getChildContext() {
    return {
      uploader: {
        browse: this._handleBrowse,
        retry: this._handleRetry
      }
    }
  }

  _getFolderCode(container) {
    const item = container.closest('.drive-item')
    if(item && item.dataset.type === 'folder') return item.dataset.code
    const folder = container.closest('.drive-folder')
    if(folder) return folder.dataset.code
    return null
  }

  _getFileIndex(file) {
    const { files } = this.props
    return _.findIndex(files, {
      id: file.uniqueIdentifier,
      service: 'device'
    })
  }

  _getProgress() {
    const { files } = this.props
    return {
      files,
      onClose: this._handleToggle
    }
  }

  _handleAdd(file) {
    if(_.includes(ignored, file.file.name)) {
      return this.resumable.removeFile(file)
    }
    if(!file.file.type.match(/image/)) {
      return this.props.onAdd({
        id: file.uniqueIdentifier,
        folder_code: this._getFolderCode(file.container),
        source_id: 'device',
        name: file.file.name,
        service: 'device',
        content_type: file.file.type,
        path: file.relativePath,
        status: 'pending'
      })
    }
    const filereader = new FileReader()
    filereader.readAsArrayBuffer(file.file)
    filereader.onloadend = this._handleLoad.bind(this, file)
  }

  _handleBrowse() {
    setTimeout(() => this.browse.click(), 250)
  }

  _handleCreate() {
    const files = this.props.files.map(file => ({
      folder_code: file.folder_code,
      path: file.path,
      asset_id: file.asset.id
    }))
    this.props.onCreate(files)
  }

  _handleFailure(file) {
    const index = this._getFileIndex(file)
    this.props.onUpdate(index, {
      status: 'failed'
    })
  }

  _handleLoad(file, e) {
    const arrayBuffer = e.target.result
    const bytes = new Uint8Array(arrayBuffer)
    const binary = bytes.reduce((binary, byte) => {
      return binary + String.fromCharCode(byte)
    }, '')
    const base64 = window.btoa(binary)
    this.props.onAdd({
      id: file.uniqueIdentifier,
      folder_code: this._getFolderCode(file.container),
      source_id: 'device',
      name: file.file.name,
      service: 'device',
      content_type: file.file.type,
      path: file.relativePath,
      thumbnail: `data:${file.file.type};base64,${base64}`,
      status: 'pending'
    })
  }

  _handleProcessed(asset) {
    const { network } = this.context
    if(asset.status !== 'processed') return
    const file = _.find(file, { asset: { id: asset.id } })
    const index = this.findIndex(file)
    this.props.onUpdate(index, {
      status: 'importing'
    })
    network.leave(`/admin/assets/${asset.id}`)
    network.unsubscribe([
      { target: `/admin/assets/${asset.id}`, action: 'refresh', handler: this._handleProcessed }
    ])
    this._handleCreate()
  }

  _handleProgress(file) {
    const { files } = this.props
    const index = this._getFileIndex(file)
    if(files[index].status === 'uploading') return
    this.props.onUpdate(index, {
      status: 'uploading'
    })
  }

  _handleRemove(oldFiles) {
    const { files } = this.props
    const removed = oldFiles.find(file => {
      return _.find(files, { id: file.id, service: file.service }) === undefined
    })
    if(removed.service !== 'device') return
    const file = this.resumable.getFromUniqueIdentifier(removed.id)
    this.resumable.removeFile(file)
  }

  _handleRetry(id) {
    const file = this.resumable.getFromUniqueIdentifier(id)
    file.retry()
  }

  _handleToggle() {
    this.props.onToggle()
  }

  _handleSuccess(file, message) {
    const { network } = this.context
    const asset = JSON.parse(message).data
    this.resumable.removeFile(file)
    const index = this._getFileIndex(file)
    this.props.onUpdate(index, {
      asset,
      status: asset.status === 'assembled' ? 'processing' : 'complete'
    })
    if(asset.status === 'assembled') {
      network.join(`/admin/assets/${asset.id}`)
      network.subscribe([
        { target: `/admin/assets/${asset.id}`, action: 'refresh', handler: this._handleProcessed }
      ])
    }
  }

  _handleUpload() {
    this.resumable.upload()
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(Uploader)
