import { connect } from 'react-redux'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

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
    multiple: PropTypes.bool,
    token: PropTypes.string,
    onAdd: PropTypes.func
  }

  browse = null
  drop = null

  _handleAdd = this._handleAdd.bind(this)
  _handleAssignBrowse = this._handleAssignBrowse.bind(this)
  _handleAssignDrop = this._handleAssignDrop.bind(this)
  _handleBrowse = this._handleBrowse.bind(this)
  _handleProcessSuccess = this._handleProcessSuccess.bind(this)
  _handleUploadSuccess = this._handleUploadSuccess.bind(this)

  render() {
    return (
      <div className="maha-attachments" ref={ node => this.drop = node }>
        { this.props.children }
        <div ref={ node => this.browse = node } />
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
    this.resumable.assignBrowse(this.browse)
    this.resumable.assignDrop(this.drop)
  }

  getChildContext() {
    return {
      uploader: {
        assignBrowse: this._handleAssignBrowse,
        assignDrop: this._handleAssignDrop,
        browse: this._handleBrowse
      }
    }
  }

  _handleAssignBrowse(ref) {
    this.resumable.assignBrowse(ref)
  }

  _handleAssignDrop(ref) {
    this.resumable.assignDrop(ref)
  }

  _handleAdd(file) {
    if(!file.file.type.match(/image/)) {
      return this.props.onAdd({
        id: file.uniqueIdentifier,
        source_id: 'device',
        name: file.file.name,
        service: 'device',
        content_type: file.file.type,
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
      status: 'pending'
    })
  }
  
  _handleUploadSuccess(file, message) {
    const { network } = this.context
    const { onUpdateUpload, onRemoveUpload } = this.props
    const asset = JSON.parse(message).data
    this.resumable.removeFile(file)
    onUpdateUpload(file.file.uniqueIdentifier, {
      asset_id: asset.id,
      status: asset.status === 'assembled' ? 'processing' : 'complete'
    })
    if(asset.status === 'assembled') {
      network.join(`/admin/assets/${asset.id}`)
      network.subscribe([
        { target: `/admin/assets/${asset.id}`, action: 'refresh', handler: this._handleProcessSuccess }
      ])
    } else {
      if(this.handler) this.handler(asset)
      onRemoveUpload(file)
    }
  }

  _handleProcessSuccess(asset) {
    const { network } = this.context
    if(asset.status !== 'processed') return
    const { uploads, onRemoveUpload, onUpdateUpload } = this.props
    const file = _.find(uploads, { asset_id: asset.id })
    onUpdateUpload(file.file.uniqueIdentifier, { status: 'complete' })
    network.leave(`/admin/assets/${asset.id}`)
    network.unsubscribe([
      { target: `/admin/assets/${asset.id}`, action: 'refresh', handler: this._handleProcessSuccess }
    ])
    if(this.handler) this.handler(asset)
    onRemoveUpload(file)
  }

}

const mapStateToProps = (state, props) => ({
  token: state.maha.admin.team.token
})

export default connect(mapStateToProps)(Uploader)
