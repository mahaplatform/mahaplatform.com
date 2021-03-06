import { connect } from 'react-redux'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
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
    allow: PropTypes.object,
    children: PropTypes.any,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    token: PropTypes.string,
    onAdd: PropTypes.func,
    onUpdate: PropTypes.func
  }

  browse = null
  drop = null

  _handleAdd = this._handleAdd.bind(this)
  _handleBrowse = this._handleBrowse.bind(this)
  _handleFailure = this._handleFailure.bind(this)
  _handleProcessed = this._handleProcessed.bind(this)
  _handleProgress = this._handleProgress.bind(this)
  _handleRetry = this._handleRetry.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)
  _handleUpload = this._handleUpload.bind(this)

  render() {
    return (
      <div className="maha-attachments" ref={ node => this.drop = node }>
        { this.props.children }
        <div ref={ node => this.browse = node } />
      </div>
    )
  }

  componentDidMount() {
    const { allow, multiple, token } = this.props
    this.resumable = new Resumable({
      target: '/api/admin/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      ...(allow && allow.extensions) ? {
        fileType: allow.extensions
      } : {},
      headers: {
        'Authorization': `Bearer ${token}`
      },
      ...!multiple ? { maxFiles: 1 } : {}
    })
    this.resumable.on('fileAdded', this._handleAdd)
    this.resumable.on('fileError', this._handleFailure)
    this.resumable.on('fileProgress', this._handleProgress)
    this.resumable.on('fileSuccess', this._handleSuccess)
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
        retry: this._handleRetry,
        upload:this._handleUpload
      }
    }
  }

  _getFileIndex(file) {
    const { files } = this.props
    return _.findIndex(files, {
      id: file.uniqueIdentifier,
      service: 'device'
    })
  }

  _handleAdd(file) {
    if(_.includes(ignored, file.file.name)) {
      return this.resumable.removeFile(file)
    }
    if(!file.file.type.match(/(jpeg|jpg|gif|png)/)) {
      return this.props.onAdd({
        id: file.uniqueIdentifier,
        source_id: 'device',
        name: file.file.name,
        service: 'device',
        content_type: file.file.type,
        status: 'pending',
        progress: 0
      })
    }
    const filereader = new FileReader()
    filereader.readAsArrayBuffer(file.file)
    filereader.onloadend = this._handleLoad.bind(this, file)
  }

  _handleBrowse() {
    setTimeout(() => this.browse.click(), 250)
  }

  _handleFailure(file) {
    const index = this._getFileIndex(file)
    this.props.onUpdate(index, {
      status: 'failed'
    })
  }

  _handleJoin(asset) {
    const { network } = this.context
    const target = `/admin/assets/${asset.id}`
    network.join(target)
    network.subscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
  }

  _handleLeave(asset) {
    const { network } = this.context
    const target = `/admin/assets/${asset.id}`
    network.leave(target)
    network.unsubscribe([
      { target, action: 'refresh', handler: this._handleFetch }
    ])
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
      source_id: 'device',
      name: file.file.name,
      service: 'device',
      content_type: file.file.type,
      thumbnail: `data:${file.file.type};base64,${base64}`,
      status: 'pending',
      progress: 0
    })
  }

  _handleProcessed(asset) {
    if(!asset || asset.status !== 'processed') return
    const file = _.find(file, { asset: { id: asset.id } })
    const index = this._getFileIndex(file)
    this.props.onUpdate(index, {
      status: 'imported'
    })
    this._handleLeave(asset)
  }

  _handleProgress(file) {
    const index = this._getFileIndex(file)
    this.props.onUpdate(index, {
      progress: file.progress(),
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

  _handleSuccess(file, message) {
    const asset = JSON.parse(message).data
    this.resumable.removeFile(file)
    const index = this._getFileIndex(file)
    this.props.onUpdate(index, {
      asset,
      status: asset.status === 'assembled' ? 'processing' : 'complete'
    })
    if(asset.status === 'assembled') this._handleJoin(asset)
  }

  _handleRetry(id) {
    const file = this.resumable.getFromUniqueIdentifier(id)
    file.retry()
  }

  _handleUpload() {
    this.resumable.upload()
  }

}

const mapStateToProps = (state, props) => ({
  files: state.maha.attachments.files,
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(Uploader)
