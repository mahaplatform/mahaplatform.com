import Attachments from '../attachments'
import { connect } from 'react-redux'
import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import Emojis from '../emojis'
import Camera from '../camera'
import React from 'react'
import _ from 'lodash'

class Composer extends React.Component {

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    attachments: PropTypes.bool,
    defaultValue: PropTypes.string,
    emojis: PropTypes.bool,
    icon: PropTypes.string,
    placeholder: PropTypes.string,
    uploads: PropTypes.array,
    onAddAssets: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onGrow: PropTypes.func,
    onReady: PropTypes.func,
    onSetState: PropTypes.func,
    onSubmit: PropTypes.func,
    onToggleEmojis: PropTypes.func,
    onUpArrow: PropTypes.func
  }

  static defaultProps = {
    attachments: true,
    icon: 'comment',
    placeholder: 'Enter text',
    onChange: () => {},
    onKeyUp: () => {},
    onPaste: () => {},
    onReady: () => {},
    onSubmit: () => {},
    onUpArrow: () => {},
    onFocus: () => {},
    onGrow: () => {}
  }

  composer = null
  files = {}
  resumable = null

  state = {
    value: ''
  }

  _handleAddAssets = this._handleAddAssets.bind(this)
  _handleAttachments = this._handleAttachments.bind(this)
  _handleAutogrow = this._handleAutogrow.bind(this)
  _handleCameraAdd = this._handleCameraAdd.bind(this)
  _handleCameraUpdate = this._handleCameraUpdate.bind(this)
  _handleChange = this._handleChange.bind(this)
  _handleFileAdded = this._handleFileAdded.bind(this)
  _handleFileSuccess = this._handleFileSuccess.bind(this)
  _handleFileFinish = this._handleFileFinish.bind(this)
  _handleKeyDown = this._handleKeyDown.bind(this)
  _handleKeyUp = this._handleKeyUp.bind(this)
  _handleInsertEmoji = this._handleInsertEmoji.bind(this)
  _handlePaste = this._handlePaste.bind(this)
  _handlePhoto = this._handlePhoto.bind(this)
  _handleReset = this._handleReset.bind(this)
  _handleSave = this._handleSave.bind(this)
  _handleToggleEmojis = this._handleToggleEmojis.bind(this)

  render() {
    const { attachments, emojis } = this.props
    return (
      <div className="maha-composer">
        <div className="maha-composer-component">
          { attachments &&
            <div className="maha-composer-attachment" onClick={ this._handleAttachments }>
              <i className="fa fa-fw fa-plus" />
            </div>
          }
          <div className="maha-composer-input">
            <div className="maha-composer-text">
              <div className="maha-composer-editor">
                <textarea { ...this._getTextarea() } ref={ node => this.composer = node } />
              </div>
              <div className="maha-composer-photo">
                <Camera { ...this._getCamera() } />
              </div>
              <div className="maha-composer-emojis" onClick={ this._handleToggleEmojis }>
                <i className="fa fa-smile-o" />
              </div>
            </div>
          </div>
          <div className="maha-composer-send" onClick={ this._handleSave }>
            <i className="fa fa-fw fa-paper-plane" />
          </div>
        </div>
        { emojis && <Emojis { ...this._getEmojis() } /> }
      </div>
    )
  }

  componentDidMount() {
    const { defaultValue, team } = this.props
    if(defaultValue) this.setState({ value: defaultValue })
    this.resumable = new Resumable({
      target: '/api/admin/assets/upload',
      chunkSize: 1024 * 128,
      permanentErrors: [204, 400, 404, 409, 415, 500, 501],
      headers: {
        'Authorization': `Bearer ${team.token}`
      }
    })
    this.resumable.on('fileAdded', this._handleFileAdded)
    this.resumable.on('fileSuccess', this._handleFileSuccess)
    this.props.onReady()
  }

  componentDidUpdate(prevProps, prevState) {
    const { onChange } = this.props
    const { value } = this.state
    if(value !== prevState.value) {
      onChange(value)
      this._handleAutogrow()
    }
  }

  _getTextarea() {
    const { placeholder } = this.props
    const { value } = this.state
    return {
      placeholder,
      rows: 1,
      value,
      onPaste: this._handlePaste,
      onKeyDown: this._handleKeyDown,
      onKeyUp: this._handleKeyUp,
      onChange: this._handleChange
    }
  }

  _getCamera() {
    return {
      icon: 'camera',
      onAdd: this._handleCameraAdd,
      onUpdate: this._handleCameraUpdate
    }
  }

  _getAttachments() {
    return {
      prompt: 'Upload File(s)',
      onChooseAssets: this._handleAddAssets,
      multiple: true
    }
  }

  _getEmojis() {
    return {
      onChoose: this._handleInsertEmoji,
      onClose: this._handleToggleEmojis
    }
  }

  _handleAddAssets(assets) {
    this.props.onAddAssets(assets.map(asset => ({
      ...asset,
      identifier: _.random(Math.pow(36,9).toString(36), Math.pow(36, 10) - 1).toString(36)
    })))
  }

  _handleAttachments() {
    this.context.modal.open(<Attachments { ...this._getAttachments() } />)
  }

  _handleAutogrow() {
    this.composer.style.height = 0
    if(this.composer.clientHeight === this.composer.scrollHeight) return
    this.composer.style.height = `${this.composer.scrollHeight}px`
    this.props.onGrow()
  }

  _handleCameraAdd(asset) {
    this.props.onAddAssets([asset])
  }

  _handleCameraUpdate(identifier, asset) {
    this.props.onUpdateAsset(identifier, asset)
  }

  _handleChange() {
    const { value } = this.composer
    this.setState({ value })
  }

  _handleFileAdded(file) {
    this.props.onAddAssets([{
      content_type: file.file.type,
      file: file.file,
      identifier: file.uniqueIdentifier,
      source: 'device'
    }])
    this.resumable.upload()
  }

  _handleFileSuccess(file, message) {
    const { network } = this.context
    const response = JSON.parse(message)
    const asset = response.data
    this.resumable.removeFile(file)
    this.props.onUpdateAsset(file.uniqueIdentifier, asset)
    this.files[asset.id] = file
    network.join(`/admin/assets/${asset.id}`)
    network.subscribe([
      { target: `/admin/assets/${asset.id}`, action: 'refresh', handler: this._handleFileFinish }
    ])
  }

  _handleFileFinish(asset) {
    const { network } = this.context
    if(asset.status !== 'processed') return
    const file = this.files[asset.id]
    network.leave(`/admin/assets/${asset.id}`)
    network.unsubscribe([
      { target: `/admin/assets/${asset.id}`, action: 'refresh', handler: this._handleFileFinish }
    ])
    delete this.files[asset.id]
    this.props.onUpdateAsset(file.uniqueIdentifier, asset)
  }

  _handleKeyDown(e) {
    if(!(e.keyCode === 13 && e.shiftKey === false)) return
    e.preventDefault()
    this._handleSave()
  }

  _handlePaste(e) {
    const { onPaste } = this.props
    const item = e.clipboardData.items[0]
    if(item.kind === 'string') {
      const value = this.composer.value + e.clipboardData.getData('Text')
      return onPaste(value)
    }
    if(item.kind === 'file') {
      const file = e.clipboardData.items[0].getAsFile()
      this.resumable.addFile(file, e)
    }
  }

  _handleKeyUp(e) {
    this.props.onKeyUp(e)
  }

  _handleInsertEmoji(emoji) {
    const { value } = this.composer
    if(document.selection) {
      this.composer.focus()
      const selection = document.selection.createRange()
      selection.text = emoji
    } else if (this.composer.selectionStart || this.composer.selectionStart === '0') {
      const beginning = value.substring(0, this.composer.selectionStart)
      const ending = value.substring(this.composer.selectionEnd, value.length)
      this.setState({
        value: beginning + emoji + ending
      })
    } else {
      this.setState({
        value: value + emoji
      })
    }
  }

  _handlePhoto() {
    this._handleAttachments()
  }

  _handleReset() {
    this.setState({ value: '' })
  }

  _handleSave() {
    const { onSubmit } = this.props
    const value = this.composer.value
    onSubmit(value)
    this._handleReset()
  }

  _handleToggleEmojis() {
    this.props.onToggleEmojis()
  }

}

const mapStateToProps = (state, props) => ({
  team: state.maha.admin.team
})

export default connect(mapStateToProps)(Composer)
