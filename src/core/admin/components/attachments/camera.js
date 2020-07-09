import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import React from 'react'

class Camera extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    onAdd: PropTypes.func
  }

  button = null
  input = null
  resumable = null

  _handleAdd = this._handleAdd.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleClick = this._handleClick.bind(this)
  _handleSuccess = this._handleSuccess.bind(this)

  render() {
    return (
      <div className="maha-attachments-source" onClick={ this._handleClick }>
        <input type="file" ref={ node => this.input = node } capture />
        <div className="maha-attachments-source-logo">
          <div className="maha-attachments-source-favicon">
            <i className="fa fa-camera" />
          </div>
        </div>
        <div className="maha-attachments-source-text">
          Your Camera
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { team } = this.context.admin
    this.resumable = new Resumable({
      target: '/api/admin/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      headers: {
        'Authorization': `Bearer ${team.token}`
      },
      maxFiles: 1,
      fileType: ['jpg','png','gif','jpeg']
    })
    this.resumable.on('fileAdded', this._handleAdd)
    this.resumable.on('fileSuccess', this._handleSuccess)
    this.input.setAttribute('accept', 'image/*')
    this.input.addEventListener('change', this._handleChange)
  }

  _handleAdd(file) {
    this.resumable.upload()
  }

  _handleChange(e) {
    this.resumable.addFiles(e.target.files, e)
  }

  _handleClick() {
    this.input.style.display = 'block'
    this.input.focus()
    this.input.click()
    this.input.style.display = 'none'
  }

  _handleSuccess(file, message) {
    const response = JSON.parse(message)
    const asset = response.data
    this.resumable.removeFile(file)
    this.props.onAdd({
      id: asset.id,
      source_id: 'device',
      name: asset.original_file_name,
      service: 'device',
      content_type: asset.content_type,
      asset,
      thumbnail: asset.content_type.match(/(jpeg|jpg|gif|png)/) ? asset.signed_url : null,
      status: 'imported'
    })
  }

}

export default Camera
