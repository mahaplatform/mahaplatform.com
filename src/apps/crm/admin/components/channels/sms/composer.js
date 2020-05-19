import { Composer } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class SmsComposer extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    placeholder: PropTypes.string,
    onSubmit: PropTypes.func
  }

  static defaultProps = {
    onSubmit: () => {},
    placeholder: 'Enter text'
  }

  state = {
    attachments: [],
    text: ''
  }

  _handleAddAttachments = this._handleAddAttachments.bind(this)
  _handleRemoveAttachment = this._handleRemoveAttachment.bind(this)
  _handleUpdateAttachment = this._handleUpdateAttachment.bind(this)
  _handleUpdateText = this._handleUpdateText.bind(this)
  _handleReset = this._handleReset.bind(this)
  _handleSubmit = this._handleSubmit.bind(this)

  render() {
    return <Composer { ...this._getComposer() } />
  }

  _getComposer() {
    const { attachments, text } = this.state
    const { placeholder } = this.props
    return {
      attachments,
      placeholder,
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

  _handleRemoveAttachment(index) {
    this.setState({
      attachments: [
        ...this.state.attachments.filter((attachment, i) => {
          return i !== index
        })
      ]
    })
  }

  _handleReset() {
    this.setState({
      attachments: [],
      text: ''
    })
  }

  _handleSubmit() {
    const { attachments, text } = this.state
    if(text.length === 0 && attachments.length === 0) return
    this.props.onSubmit({ attachments, text })
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

export default SmsComposer
