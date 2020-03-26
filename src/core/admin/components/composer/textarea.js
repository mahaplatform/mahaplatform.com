import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import Emojis from '../emojis'
import getUrls from 'get-urls'
import Quoted from './quoted'
import Link from './link'
import React from 'react'

class TextArea extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.array,
    link: PropTypes.object,
    placeholder: PropTypes.string,
    quoted: PropTypes.object,
    reference: PropTypes.func,
    submitOnEnter: PropTypes.bool,
    value: PropTypes.string,
    onAddAttachments: PropTypes.func,
    onAddLink: PropTypes.func,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    onFetchLink: PropTypes.func,
    onRemoveLink: PropTypes.func,
    onUpdateAttachment: PropTypes.func
  }

  state = {
    value: ''
  }

  input = null
  offset = 0

  _handleAddLink = this._handleAddLink.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleFetchLink = this._handleFetchLink.bind(this)
  _handleFileAdded = this._handleFileAdded.bind(this)
  _handleFileSuccess = this._handleFileSuccess.bind(this)
  _handleFocus = this._handleFocus.bind(this)
  _handleInsertEmoji = this._handleInsertEmoji.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)
  _handleKeyUp = this._handleKeyUp.bind(this)
  _handlePaste = this._handlePaste.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    const { link, quoted } = this.props
    return (
      <div className="maha-composer-textarea">
        <div className="maha-composer-textarea-field">
          { quoted &&
            <Quoted { ...this._getQuoted() }/>
          }
          <textarea ref={ node => this.input = node } { ...this._getTextArea() } />
          { link &&
            <Link { ...this._getLink() } />
          }
        </div>
        <div className="maha-composer-textarea-emojis">
          <Emojis { ...this._getEmojis() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { token } = this.context.admin.team
    const { reference } = this.props
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
    this.input.style.boxSizing = 'border-box'
    this.offset = this.input.offsetHeight - this.input.clientHeight
    reference({
      focus: this._handleFocus
    })
  }

  componentDidUpdate(prevProps, prevState) {
    const { value } = this.props
    if(value !== prevProps.value) {
      this.setState({ value })
    }
    if(this.state.value !== prevState.value) {
      this._handleChange()
    }
  }

  _getEmojis() {
    return {
      onChoose: this._handleInsertEmoji
    }
  }

  _getLink() {
    const { link, onRemoveLink } = this.props
    return {
      link,
      onRemove: onRemoveLink
    }
  }

  _getQuoted() {
    const { quoted } = this.props
    return {
      quoted
    }
  }

  _getTextArea() {
    const { placeholder} = this.props
    const { value } = this.state
    return {
      placeholder,
      value,
      rows: 1,
      onChange: this._handleUpdate,
      onKeyDown: this._handleKeyDown,
      onKeyUp: this._handleKeyUp,
      onPaste: this._handlePaste
    }
  }

  _handleAddLink({ data }) {
    this.props.onAddLink(data)
  }

  _handleChange() {
    this.props.onChange(this.state.value )
  }

  _handleFetchLink(url) {
    this.context.network.request({
      endpoint: '/api/admin/links',
      method: 'post',
      body: {
        url
      },
      onSuccess: this._handleAddLink
    })
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

  _handleFocus() {
    this.input.focus()
  }

  _handleInsertEmoji(emoji) {
    const { value } = this.input
    if(document.selection) {
      this.input.focus()
      const selection = document.selection.createRange()
      selection.text = emoji
    } else if (this.input.selectionStart || this.input.selectionStart === '0') {
      const beginning = value.substring(0, this.input.selectionStart)
      const ending = value.substring(this.input.selectionEnd, value.length)
      this.setState({
        value: beginning + emoji + ending
      })
    } else {
      this.setState({
        value: value + emoji
      })
    }
  }

  _handleKeyDown(e) {
    const { submitOnEnter } = this.props
    if(!submitOnEnter || !(e.keyCode === 13 && e.shiftKey === false)) return
    e.preventDefault()
    this.props.onEnter()
  }

  _handleKeyUp(e) {
    this.input.style.height = 'auto'
    this.input.style.height = this.input.scrollHeight + this.offset + 'px'
  }

  _handlePaste(e) {
    const item = e.clipboardData.items[0]
    if(item.kind === 'string') {
      const text = e.clipboardData.getData('Text')
      this._handleParse(text)
    }
    if(item.kind === 'file') {
      const file = e.clipboardData.items[0].getAsFile()
      this.resumable.addFile(file)
    }
  }

  _handleParse(text) {
    const { link } = this.props
    if(link) return
    const urls = Array.from(getUrls(text, {
      sortQueryParameters: false,
      removeTrailingSlash: true,
      stripWWW: false,
      stripFragment: false,
      normalizeProtocol: false
    }))
    if(urls.length === 0) return
    const url = urls[0]
    if(url.startsWith(process.env.WEB_HOST)) return
    this._handleFetchLink(url)
  }

  _handleUpdate(e) {
    const { value } = e.target
    this.setState({ value })
  }

}

export default TextArea
