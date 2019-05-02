import { CSSTransition } from 'react-transition-group'
import { AssetIcon } from 'maha-admin'
import { connect } from 'react-redux'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import numeral from 'numeral'
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
    browseTarget: PropTypes.any,
    children: PropTypes.any,
    dropTarget: PropTypes.any,
    progress: PropTypes.number,
    token: PropTypes.string,
    uploads: PropTypes.array,
    onAddUpload: PropTypes.func,
    onUpdateUpload: PropTypes.func,
    onUpdateUploadProgress: PropTypes.func,
    onRemoveUpload: PropTypes.func
  }

  handler = null

  _handleAddUpload = this._handleAddUpload.bind(this)
  _handleAssignBrowse = this._handleAssignBrowse.bind(this)
  _handleAssignDrop = this._handleAssignDrop.bind(this)
  _handleBrowse = this._handleBrowse.bind(this)
  _handleProcessSuccess = this._handleProcessSuccess.bind(this)
  _handleUpdateUploadProgress = this._handleUpdateUploadProgress.bind(this)
  _handleUploadSuccess = this._handleUploadSuccess.bind(this)

  render() {
    const { uploads } = this.props
    return (
      <div className="maha-uploader">
        { this.props.children }
        <CSSTransition in={ uploads.length > 0 } classNames="expanded" timeout={ 150 } mountOnEnter={ true } unmountOnExit={ true }>
          <div className="maha-uploads">
            { uploads.map((upload, index) => (
              <div className="maha-upload" key={`upload_${index}`}>
                <div className="maha-upload-progress">
                  <div className="loader" style={ this._getProgress(upload) }></div>
                  <div className="maha-upload-icon">
                    <AssetIcon content_type={ upload.file.type } />
                  </div>
                  <div className="maha-upload-name">
                    { upload.file.name }
                  </div>
                  { _.includes(['added','uploading'], upload.status) &&
                    <div className="maha-upload-action" onClick={ this._handleRemoveUpload.bind(this, upload.file) }>
                      <i className="fa fa-fw fa-times" />
                    </div>
                  }
                </div>
              </div>
            ))}
          </div>
        </CSSTransition>
        <div ref={ node => this.upload = node } />
      </div>
    )
  }

  componentDidMount() {
    const { token } = this.props
    const { browseTarget, dropTarget } = this.props
    this.resumable = new Resumable({
      target: '/api/admin/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    this.resumable.on('fileAdded', this._handleAddUpload)
    this.resumable.on('fileProgress', this._handleUpdateUploadProgress)
    this.resumable.on('fileSuccess', this._handleUploadSuccess)
    this.resumable.assignBrowse(this.upload)
    if(browseTarget) this.resumable.assignBrowse(browseTarget)
    if(dropTarget) this.resumable.assignDrop(dropTarget)
  }

  getChildContext() {
    return {
      uploader: {
        browse: this._handleBrowse,
        assignBrowse: this._handleAssignBrowse,
        assignDrop: this._handleAssignDrop
      }
    }
  }

  _getProgress(upload) {
    const percent = numeral(upload.progress / 100).format('0%')
    return {
      width: `${percent}`
    }
  }

  _handleAssignBrowse(ref, handler = null) {
    this.resumable.assignBrowse(ref)
    this.handler = handler
  }

  _handleAssignDrop(ref, handler = null) {
    this.resumable.assignDrop(ref)
    this.handler = handler
  }

  _handleBrowse(handler = null) {
    this.handler = handler
    setTimeout(() => this.upload.click(), 250)
  }

  _handleAddUpload(file) {
    this.props.onAddUpload(file)
    this.resumable.upload()
  }

  _handleRemoveUpload(file) {
    this.props.onRemoveUpload(file)
    this.resumable.removeFile(file)
  }

  _handleUpdateUploadProgress(file) {
    this.props.onUpdateUploadProgress(file.file.uniqueIdentifier, file.progress())
  }

  _handleUploadSuccess(file, message) {
    const { network } = this.context
    const { onUpdateUpload } = this.props
    const asset = JSON.parse(message)
    this.resumable.removeFile(file)
    const asset_id = asset.data.id
    onUpdateUpload(file.file.uniqueIdentifier, { asset_id, status: 'processing' })
    network.join(`/admin/assets/${asset.data.id}`)
    network.subscribe([
      { target: `/admin/assets/${asset.data.id}`, action: 'refresh', handler: this._handleProcessSuccess }
    ])
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
