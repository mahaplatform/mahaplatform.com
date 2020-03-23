import { connect } from 'react-redux'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import Preview from './preview'
import React from 'react'
import _ from 'lodash'

class FileField extends React.Component {

  static propTypes = {
    defaultValue: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array
    ]),
    button: PropTypes.element,
    disabled: PropTypes.bool,
    endpoint: PropTypes.string,
    files: PropTypes.array,
    multiple: PropTypes.bool,
    multiplePrompt: PropTypes.string,
    prompt: PropTypes.string,
    status: PropTypes.string,
    token: PropTypes.string,
    tabIndex: PropTypes.number,
    types: PropTypes.array,
    value: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.array
    ]),
    onAddFile: PropTypes.func,
    onChange: PropTypes.func,
    onChangeFile: PropTypes.func,
    onLoadFiles: PropTypes.func,
    onUploadBegin: PropTypes.func,
    onUploadComplete: PropTypes.func,
    onUploadProgress: PropTypes.func,
    onUploadProcess: PropTypes.func,
    onUploadSuccess: PropTypes.func,
    onUploadFailure: PropTypes.func,
    onBusy: PropTypes.func,
    onReady: PropTypes.func,
    onRemoveFile: PropTypes.func,
    onSetReady: PropTypes.func
  }

  static defaultProps = {
    defaultValue: null,
    disabled: false,
    endpoint: '/api/admin/assets',
    multiple: false,
    multiplePrompt: 'Choose Another File',
    prompt: 'Choose File',
    tabIndex: 0,
    onBusy: () => {},
    onChange: () => {},
    onReady: () => {},
    onSet: () => {}
  }

  state = {
    previews: {}
  }

  render() {
    const { button, files, multiple, multiplePrompt, prompt, status, tabIndex } = this.props
    let classes = ['maha-filefield', status]
    return (
      <div className={classes.join(' ')} tabIndex={ tabIndex }>
        <div className="maha-filefield-tokens">
          { files.map((file, index) => (
            <Preview key={`filefield_${index}`} { ...this._getFile(file, index) } />
          ))}
        </div>
        { (files.length === 0 || multiple === true) &&
          <div className="maha-filefield-button" ref={ (node) => this.button = node }>
            { button ? button :
              <div className="ui browse button">
                { files.length === 0 ? prompt :  multiplePrompt }
              </div>
            }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, endpoint, token, onLoadFiles, onSetReady } = this.props
    if(!defaultValue) return onSetReady()
    const ids = _.castArray(defaultValue)
    if(ids.length === 0) return onSetReady()
    onLoadFiles(endpoint, token, ids)
  }

  componentDidUpdate(prevProps) {
    const { files, multiple, status, value, onChange, onReady } = this.props
    if(status !== prevProps.status) {
      if(prevProps.status === 'pending') {
        onReady()
        this._initializeResumable()
      }
    }
    if(!_.isEqual(value, prevProps.value)) onChange(value)
    if(files.length > prevProps.files.length) {
      if(files.filter(file => file.status === 'added').length > 0) {
        this._handleUploadBegin()
      }
    } else if(files.length < prevProps.files.length && !multiple) {
      this._initializeResumable()
    }

  }

  _initializeResumable() {
    const { files, multiple, status, token, types } = this.props
    if(status !== 'ready') return
    this.resumable = new Resumable({
      target: '/api/admin/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      maxFiles: multiple ? undefined : 1,
      fileType: types,
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    this.resumable.on('fileAdded', this._handleFileAdded.bind(this))
    this.resumable.on('fileProgress', this._handleUploadProgress.bind(this))
    this.resumable.on('fileSuccess', this._handleUploadSuccess.bind(this))
    this.resumable.on('error', this._handleUploadFailure.bind(this))
    this.resumable.on('complete', this._handleUploadComplete.bind(this))
    if(multiple || (!multiple && files.length === 0)) {
      this.resumable.assignBrowse(this.button)
      this.resumable.assignDrop(this.button)
    }
  }

  _getFile(file, index) {
    return {
      file,
      preview: this.state.previews[file.uniqueIdentifier],
      onRemove: this._handleRemoveFile.bind(this, index)
    }
  }

  _handleFileAdded(file) {
    const fileReader = new FileReader()
    this.props.onAddFile(file.uniqueIdentifier, file.file.name, file.file.size, file.file.type, file.chunks.length)
    if(!file.file.type.match(/(jpeg|jpg|gif|png)/)) return
    fileReader.readAsDataURL(file.file)
    fileReader.onload = this._handleImagePreview.bind(this, file.file.uniqueIdentifier)
  }

  _handleImagePreview(uid, e) {
    this.setState({
      previews: {
        ...this.state.previews,
        [uid]: e.target.result
      }
    })
  }

  _handleUploadBegin() {
    this.resumable.upload()
    this.props.onUploadBegin()
    this.props.onBusy(true)
  }

  _handleUploadProgress(file) {
    this.props.onUploadProgress(file.file.uniqueIdentifier, file.progress())
  }

  _handleUploadFailure(file, message) {
    this.props.onUploadFailure(message)
    this.props.onBusy(false)
  }

  _handleUploadSuccess(file, message) {
    const asset = JSON.parse(message)
    this.props.onUploadSuccess(file.file.uniqueIdentifier, asset)
    this.props.onBusy(false)
  }

  _handleRemoveFile(index) {
    const file = this.props.files[index]
    this.props.onRemoveFile(index)
    if(!file.uniqueIdentifier) return
    const resumableFile = this.resumable.getFromUniqueIdentifier(file.uniqueIdentifier)
    this.resumable.removeFile(resumableFile)
  }

  _handleUploadComplete() {
    this.props.onUploadComplete()
  }

}

const mapStateToProps = (state, props) => ({
  token: props.token || (state.maha.admin.team ? state.maha.admin.team.token : null)
})

export default connect(mapStateToProps)(FileField)
