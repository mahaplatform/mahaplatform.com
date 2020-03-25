import PropTypes from 'prop-types'
import Composer from '../composer'
import React from 'react'
import _ from 'lodash'

class CommentComposer extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    placeholder: PropTypes.string,
    quoted: PropTypes.object,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    placeholder: 'Enter text'
  }

  state = {
    attachments: [],
    link: null,
    text: ''
  }

  _handleAddAttachments = this._handleAddAttachments.bind(this)
  _handleAddLink = this._handleAddLink.bind(this)
  _handleRemoveAttachment = this._handleRemoveAttachment.bind(this)
  _handleRemoveLink = this._handleRemoveLink.bind(this)
  _handleUpdateAttachment = this._handleUpdateAttachment.bind(this)
  _handleUpdateText = this._handleUpdateText.bind(this)
  _handleReset = this._handleReset.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Composer { ...this._getComposer() } />
  }

  _getComposer() {
    const { attachments, link, text } = this.state
    const { placeholder, quoted } = this.props
    return {
      attachments,
      link,
      placeholder,
      quoted,
      text,
      onAddAttachments: this._handleAddAttachments,
      onAddLink: this._handleAddLink,
      onRemoveAttachment: this._handleRemoveAttachment,
      onRemoveLink: this._handleRemoveLink,
      onSubmit: this._handleSubmit,
      onUpdateAttachment: this._handleUpdateAttachment,
      onUpdateText: this._handleUpdateText
    }
  }

  _handleAddAttachments(attachments) {
    this.setState({
      attachments: [
        ...this.state.attachments,
        ..._.castArray(attachments)
      ]
    })
  }

  _handleAddLink(link) {
    this.setState({ link })
  }

  _handleRemoveAttachment(index) {
    this.setState({
      attachments: [
        ...this.state.attachments.filter((attachment, i) => {
          return i !== index
        })
      ]
    })
  }

  _handleRemoveLink() {
    this.setState({
      link: null
    })
  }

  _handleReset() {
    this.setState({
      attachments: [],
      link: null,
      text: ''
    })
  }

  _handleSubmit() {
    const { attachments, link, text } = this.state
    const { quoted } = this.props
    if(!link && text.length === 0 && attachments.length === 0) return
    this.props.onSubmit({ attachments, link, quoted, text })
    this._handleReset()
  }

  _handleUpdateAttachment(uniqueIdentifier, asset) {
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

  _handleUpdateText(text) {
    this.setState({ text })
  }

}

export default CommentComposer
