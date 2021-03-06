import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import React from 'react'
import bytes from 'bytes'
import _ from 'lodash'

class FileField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    defaultValue: PropTypes.any,
    files: PropTypes.array,
    htmlFor: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    prompt: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    tabIndex: PropTypes.number,
    token: PropTypes.string,
    value: PropTypes.array,
    onAddFile: PropTypes.func,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onRemoveFile: PropTypes.func,
    onUpdateFile: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    multiple: false,
    prompt: 'Choose File(s)',
    onChange: () => {},
    onReady: () => {}
  }

  button = null
  resumable = null

  state = {
    hover: false
  }

  _handleDragEnter = this._handleDragEnter.bind(this)
  _handleDragLeave = this._handleDragLeave.bind(this)
  _handleFileAdded = this._handleFileAdded.bind(this)
  _handleKeyPress = this._handleKeyPress.bind(this)
  _handleUploadProgress = this._handleUploadProgress.bind(this)
  _handleUploadSuccess = this._handleUploadSuccess.bind(this)
  _handleUploadFailure = this._handleUploadFailure.bind(this)

  render() {
    const { files, prompt } = this.props
    return (
      <div className="maha-filefield">
        { files.length > 0 &&
          <div className="maha-filefield-files">
            { files.map((file, index) => (
              <div className="maha-filefield-file" key={`file_${index}`} style={ this._getProgress(file) }>
                <div className="maha-filefield-file-icon">
                  <i className={`fa fa-fw fa-${this._getIcon(file)}`} />
                </div>
                <div className="maha-filefield-file-details">
                  <div className="maha-filefield-file-label">
                    { file.name } [{ bytes(file.size) }]
                  </div>
                </div>
                <div className="maha-filefield-file-remove" onClick={ this._handleRemoveFile.bind(this, index)}>
                  <i className="fa fa-times" />
                </div>
              </div>
            ))}
          </div>
        }
        <div { ...this._getButton() }>
          { prompt }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { code, multiple, token, onReady } = this.props
    this.resumable = new Resumable({
      target: `/api/forms/forms/${code}/uploads`,
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      maxFiles: multiple ? undefined : 1,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    this.resumable.on('fileAdded', this._handleFileAdded.bind(this))
    this.resumable.on('fileProgress', this._handleUploadProgress.bind(this))
    this.resumable.on('fileSuccess', this._handleUploadSuccess.bind(this))
    this.resumable.on('fileError', this._handleUploadFailure.bind(this))
    this.resumable.assignBrowse(this.button)
    this.resumable.assignDrop(this.button)
    onReady()
  }

  componentDidUpdate(prevProps) {
    const { files, status } = this.props
    if(!_.isEqual(files, prevProps.files)) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
    }
  }

  _getButton() {
    const { code, files, multiple, tabIndex } = this.props
    const { hover } = this.state
    return {
      id: code,
      className: hover ? 'ui hover button' : 'ui button',
      ref: node => this.button = node,
      style: {
        display: (multiple || files.length === 0) ? 'inline-block' : 'none'
      },
      tabIndex,
      onKeyPress: this._handleKeyPress,
      onDragEnter: this._handleDragEnter,
      onDragLeave: this._handleDragLeave
    }
  }

  _handleDragEnter(e) {
    this.setState({
      hover: true
    })
  }

  _handleDragLeave(e) {
    this.setState({
      hover: false
    })
  }

  _handleKeyPress(e) {
    if(e.which !== 13) return
    this.button.click()
  }

  _getIcon(file) {
    if(file.status === 'uploaded') return 'check-circle'
    if(file.status === 'failed') return 'exclamation-circle'
    return 'circle-o-notch fa-spin'
  }

  _getProgress({ progress, status }) {
    const color = status !== 'failed' ? '#21BA45' : '#DB2828'
    const percent = status !== 'failed' ? Math.ceil(progress * 100)+'%' : '100%'
    return {
      backgroundImage: `linear-gradient(to right, ${color} ${percent}, #999999 ${percent} 100%)`
    }
  }

  _handleChange() {
    this.props.onChange(this.props.value)
  }

  _handleFileAdded(file) {
    const { name, size, type, uniqueIdentifier } = file.file
    this.setState({
      hover: false
    })
    this.props.onAddFile({
      name,
      size,
      type,
      uniqueIdentifier,
      progress: 0,
      status: 'uploading'
    })
    this.resumable.upload()
  }

  _handleRemoveFile(index) {
    const { files } = this.props
    this.resumable.removeFile(files[index])
    this.props.onRemoveFile(index)
  }

  _handleUploadProgress(file) {
    this.props.onUpdateFile(file.uniqueIdentifier, {
      progress: file.progress()
    })
  }

  _handleUploadSuccess(file, message) {
    const asset = JSON.parse(message)
    this.props.onUpdateFile(file.uniqueIdentifier, {
      asset: asset.data,
      status: 'uploaded'
    })
  }

  _handleUploadFailure(file) {
    this.props.onUpdateFile(file.uniqueIdentifier, {
      status: 'failed'
    })
  }

  _handleValidate() {
    const { required, value } = this.props
    if(required && value.length === 0) {
      this.props.onValidate(value, 'You must upload at least one file')
    } else {
      this.props.onValidate(value)
    }
  }

}

export default FileField
