import ComposerAttachments from './attachments'
import ComposerTextArea from './textarea'
import Attachments from '../attachments'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import React from 'react'

class Composer extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.bool,
    defaultValue: PropTypes.string,
    emojis: PropTypes.bool,
    placeholder: PropTypes.string,
    token: PropTypes.string,
    uploads: PropTypes.array,
    onAddAssets: PropTypes.func,
    onChange: PropTypes.func,
    onFetchLink: PropTypes.func,
    onFocus: PropTypes.func,
    onKeyUp: PropTypes.func,
    onPaste: PropTypes.func,
    onRemoveLink: PropTypes.func,
    onSetState: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpArrow: PropTypes.func,
    onUpdateAsset: PropTypes.func
  }

  static defaultProps = {
    attachments: true,
    placeholder: 'Enter text'
  }

  editor = null
  files = {}
  resumable = null
  textarea = null

  state = {
    attachments: [],
    text: ''
  }

  _handleAddAsset = this._handleAddAsset.bind(this)
  _handleAddFile = this._handleAddFile.bind(this)
  _handleAddAssets = this._handleAddAssets.bind(this)
  _handleAttachments = this._handleAttachments.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleFileAdded = this._handleFileAdded.bind(this)
  _handleFileSuccess = this._handleFileSuccess.bind(this)
  _handleRemoveAttachment = this._handleRemoveAttachment.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleUpdateAsset = this._handleUpdateAsset.bind(this)

  render() {
    const { attachments } = this.state
    return (
      <div className="maha-comment-composer">
        <div className="maha-comment-composer-component">
          { attachments &&
            <div className="maha-comment-composer-attachment" onClick={ this._handleAttachments }>
              <i className="fa fa-plus" />
            </div>
          }
          <div className="maha-comment-composer-editor" ref={ node => this.editor = node }>
            <ComposerTextArea { ...this._getComposerTextArea() } />
            <ComposerAttachments { ...this._getComposerAttachments() } />
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { token } = this.context.admin.team
    this.resumable = new Resumable({
      target: '/api/admin/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    this.resumable.on('fileAdded', this._handleFileAdded)
    this.resumable.on('fileSuccess', this._handleFileSuccess)
    this.resumable.assignDrop(this.editor)
  }

  componentDidUpdate(prevProps, prevState) {
    const { onChange } = this.props
    const { text } = this.state
    if(text !== prevState.text) {
      onChange(text)
    }
  }

  _getAttachments() {
    return {
      prompt: 'Upload File(s)',
      onChooseAssets: this._handleAddAssets,
      multiple: true
    }
  }

  _getComposerAttachments() {
    const { attachments } = this.state
    return {
      attachments,
      onAdd: this._handleAttachments,
      onRemove: this._handleRemoveAttachment
    }
  }

  _getComposerTextArea() {
    const { placeholder, onFetchLink } = this.props
    return {
      reference: node => this.textarea = node,
      placeholder,
      onAddAsset: this._handleAddAsset,
      onAddFile: this._handleAddFile,
      onFetchLink,
      onUpdateAsset: this._handleUpdateAsset,
      onChange: this._handleChange,
      onEnter: this._handleSave
    }
  }

  _handleAddAsset(file) {
    this.setState({
      attachments: [
        ...this.state.attachments,
        file
      ]
    })
  }

  _handleAddFile(file) {
    this.resumable.addFile(file)
  }

  _handleAddAssets(assets) {
    this.setState({
      attachments: [
        ...this.state.attachments,
        ...assets
      ]
    })
  }

  _handleAttachments() {
    this.context.modal.open(<Attachments { ...this._getAttachments() } />)
  }

  _handleChange(text) {
    this.setState({ text })
  }

  _handleFileAdded(file) {
    this.resumable.upload()
    this._handleAddAsset({ file })
  }

  _handleFileSuccess(file, message) {
    const response = JSON.parse(message)
    const asset = response.data
    this.resumable.removeFile(file)
    this._handleUpdateAsset(file.uniqueIdentifier, asset)
  }

  _handleRemoveAttachment(index) {
    const { attachments } = this.state
    this.setState({
      attachments: [
        ...attachments.filter((attachment, i) => {
          return i !== index
        })
      ]
    })
  }

  _handleReset() {
    this.textarea.reset()
    this.setState({
      attachments: [],
      text: ''
    })
  }

  _handleSave() {
    const { attachments, text } = this.state
    this.props.onSubmit({
      attachments,
      text
    })
    this._handleReset()
  }

  _handleUpdateAsset(uniqueIdentifier, asset) {
    this.setState({
      attachments: [
        ...this.state.attachments.map(attachment => {
          const { file } = attachment
          return (file && file.uniqueIdentifier === uniqueIdentifier) ? {
            file: attachment.file,
            ...asset
          } : attachment
        })
      ]
    })
  }

}

export default Composer
