import ComposerAttachments from './attachments'
import ComposerTextArea from './textarea'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import React from 'react'

class Editor extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array,
    link: PropTypes.object,
    placeholder: PropTypes.string,
    quoted: PropTypes.object,
    text: PropTypes.string,
    onAddAttachments: PropTypes.func,
    onAddLink: PropTypes.func,
    onRemoveAttachment: PropTypes.func,
    onRemoveLink: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdateAttachment: PropTypes.func,
    onUpdateText: PropTypes.func
  }

  static defaultProps = {
    attachments: [],
    link: null,
    placeholder: 'Enter text',
    quoted: null
  }

  _handleFileAdded = this._handleFileAdded.bind(this)
  _handleFileSuccess = this._handleFileSuccess.bind(this)

  render() {
    return (
      <div className="maha-composer-editor" ref={ node => this.editor = node }>
        <ComposerTextArea { ...this._getComposerTextArea() } />
        <ComposerAttachments { ...this._getComposerAttachments() } />
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

  _getComposerAttachments() {
    const { attachments, onRemoveAttachment } = this.props
    return {
      attachments,
      onRemove: onRemoveAttachment
    }
  }

  _getComposerTextArea() {
    const { attachments, link, placeholder, quoted, onAddAttachments } = this.props
    const { onAddLink, onRemoveLink, onSubmit, onUpdateAttachment, onUpdateText } = this.props
    return {
      attachments,
      link,
      quoted,
      placeholder,
      reference: node => this.textarea = node,
      onAddAttachments,
      onAddLink,
      onChange: onUpdateText,
      onEnter: onSubmit,
      onRemoveLink,
      onUpdateAttachment
    }
  }

  _handleFileAdded(file) {
    this.resumable.upload()
    this.props.onAddAttachments({ file })
  }

  _handleFileSuccess(file, message) {
    const response = JSON.parse(message)
    const asset = response.data
    this.resumable.removeFile(file)
    this.props.onUpdateAttachment(file.uniqueIdentifier, asset)
  }

}

export default Editor
