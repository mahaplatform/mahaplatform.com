import PropTypes from 'prop-types'
import Camera from '../../camera'
import Emojis from '../../emojis'
import React from 'react'

class TextArea extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    placeholder: PropTypes.string,
    reference: PropTypes.func,
    value: PropTypes.string,
    onAddAsset: PropTypes.func,
    onAddFile: PropTypes.func,
    onUpdateAsset: PropTypes.func,
    onChange: PropTypes.func,
    onEnter: PropTypes.func,
    onFetchLink: PropTypes.func
  }

  state = {
    value: ''
  }

  input = null
  offset = 0

  _handleChange = this._handleChange.bind(this)
  _handleInsertEmoji = this._handleInsertEmoji.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)
  _handleKeyUp = this._handleKeyUp.bind(this)
  _handlePaste = this._handlePaste.bind(this)
  _handleReset = this._handleReset.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <div className="maha-composer-textarea">
        <div className="maha-composer-textarea-field">
          <textarea ref={ node => this.input = node } { ...this._getTextArea() } />
        </div>
        <div className="maha-composer-textarea-emojis">
          <Emojis { ...this._getEmojis() } />
        </div>
        <div className="maha-composer-textarea-camera">
          <Camera { ...this._getCamera() } />
        </div>
      </div>
    )
  }

  componentDidMount() {
    const { reference } = this.props
    reference({
      reset: this._handleReset
    })
    this.input.style.boxSizing = 'border-box'
    this.offset = this.input.offsetHeight - this.input.clientHeight
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

  _getCamera() {
    const { onAddAsset, onUpdateAsset } = this.props
    return {
      icon: 'camera',
      onAddAsset,
      onUpdateAsset
    }
  }

  _getEmojis() {
    return {
      onChoose: this._handleInsertEmoji
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

  _handleChange() {
    this.props.onChange(this.state.value )
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
    if(!(e.keyCode === 13 && e.shiftKey === false)) return
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
      this._handleParse(e.clipboardData.getData('Text'))
      const value = this.input.value + e.clipboardData.getData('Text')
    }
    if(item.kind === 'file') {
      const file = e.clipboardData.items[0].getAsFile()
      this.props.onAddFile(file)
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

  _handleReset() {
    this.setState({
      value: ''
    })
  }

  _handleUpdate(e) {
    const { value } = e.target
    this.setState({ value })
  }

}

export default TextArea
