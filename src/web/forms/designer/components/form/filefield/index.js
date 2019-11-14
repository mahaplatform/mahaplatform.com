import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import React from 'react'
import bytes from 'bytes'
import _ from 'lodash'

class FileField extends React.Component {

  static propTypes = {
    code: PropTypes.string,
    multiple: PropTypes.bool,
    name: PropTypes.string,
    prompt: PropTypes.string,
    required: PropTypes.bool,
    status: PropTypes.string,
    onChange: PropTypes.func,
    onReady: PropTypes.func,
    onFinalize: PropTypes.func,
    onValidate: PropTypes.func
  }

  static defaultProps = {
    multiple: false,
    prompt: 'Choose File(s)'
  }

  state = {
    files: []
  }

  button = null
  resumable = null

  _handleFileAdded = this._handleFileAdded.bind(this)
  _handleUploadProgress = this._handleUploadProgress.bind(this)
  _handleUploadSuccess = this._handleUploadSuccess.bind(this)
  _handleUploadFailure = this._handleUploadFailure.bind(this)

  render() {
    const { prompt } = this.props
    const { files } = this.state
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
                <div className="maha-filefield-file-remove" onClick={ this._handleRemove.bind(this, index)}>
                  <i className="fa fa-times" />
                </div>
              </div>
            ))}
          </div>
        }
        <div ref={ node => this.button = node } { ...this._getButton() }>
          { prompt }
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { multiple, onReady } = this.props
    this.resumable = new Resumable({
      target: '/api/crm/uploads',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      maxFiles: multiple ? undefined : 1
    })
    this.resumable.on('fileAdded', this._handleFileAdded.bind(this))
    this.resumable.on('fileProgress', this._handleUploadProgress.bind(this))
    this.resumable.on('fileSuccess', this._handleUploadSuccess.bind(this))
    this.resumable.on('fileError', this._handleUploadFailure.bind(this))
    this.resumable.assignBrowse(this.button)
    onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { files } = this.state
    const { status } = this.props
    if(!_.isEqual(files, prevState.files)) {
      this._handleChange()
    }
    if(status !== prevProps.status) {
      if(status === 'validating') this._handleValidate()
      if(status === 'finalizing') this._handleFinalize()
    }
  }

  _getButton() {
    const { code, multiple } = this.props
    const { files } = this.state
    return {
      id: code,
      className: 'ui button',
      style: {
        display: (multiple || files.length === 0) ? 'inline-block' : 'none'
      }
    }
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
    this.props.onChange(this.state.files)
  }

  _handleFinalize() {
    this.props.onFinalize(this.state.files)
  }

  _handleValidate() {
    const { required } = this.props
    const { files } = this.state
    if(required && files.length === 0) {
      this.props.onValidate('invalid', 'You must upload at least one file')
    } else {
      this.props.onValidate('valid')
    }
  }

  _handleFileAdded(file) {
    const { files } = this.state
    const { name, size, type, uniqueIdentifier } = file.file
    this.setState({
      files: [
        ...files,
        {
          name,
          size,
          type,
          uniqueIdentifier,
          progress: 0,
          status: 'uploading'
        }
      ]
    })
    this.resumable.upload()
  }

  _handleRemove(index) {
    const { files } = this.state
    this.resumable.removeFile(files[index])
    this.setState({
      files: [
        ...files.filter((file, i) => {
          return i !== index
        })
      ]
    })
  }

  _handleUploadProgress(file) {
    const { files } = this.state
    this.setState({
      files: [
        ...files.map((f, i) => {
          if(f.uniqueIdentifier !== file.uniqueIdentifier) return f
          return {
            ...f,
            progress: file.progress()
          }
        })
      ]
    })
  }

  _handleUploadSuccess(file) {
    const { files } = this.state
    this.setState({
      files: [
        ...files.map((f, i) => {
          if(f.uniqueIdentifier !== file.uniqueIdentifier) return f
          return {
            ...f,
            status: 'uploaded'
          }
        })
      ]
    })
  }

  _handleUploadFailure(file) {
    const { files } = this.state
    this.setState({
      files: [
        ...files.map((f, i) => {
          if(f.uniqueIdentifier !== file.uniqueIdentifier) return f
          return {
            ...f,
            status: 'failed'
          }
        })
      ]
    })
  }

}

export default FileField
