import Resumable from 'resumablejs'
import PropTypes from 'prop-types'
import React from 'react'

class TextArea extends React.Component {

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onAddAsset: PropTypes.func,
    onUpdateAsset: PropTypes.func,
    onChange: PropTypes.func
  }

  state = {
    value: ''
  }

  input = null
  resumable = null

  _handleChange = this._handleChange.bind(this)
  _handleFileAdded = this._handleFileAdded.bind(this)
  _handleFileSuccess = this._handleFileSuccess.bind(this)
  _handlePaste = this._handlePaste.bind(this)
  _handleUpdate = this._handleUpdate.bind(this)

  render() {
    return (
      <textarea ref={ node => this.input = node } { ...this._getTextArea() } />
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

  _getTextArea() {
    const { placeholder} = this.props
    const { value } = this.state
    return {
      placeholder,
      value,
      onChange: this._handleUpdate,
      onPaste: this._handlePaste
    }
  }

  _handleChange() {
    this.props.onChange(this.state.value )
  }

  _handlePaste(e) {
    const item = e.clipboardData.items[0]
    if(item.kind === 'file') {
      const file = e.clipboardData.items[0].getAsFile()
      this.resumable.addFile(file, e)
    }
  }

  _handleFileAdded(file) {
    this.resumable.upload()
    this.props.onAddAsset({ file })
  }

  _handleFileSuccess(file, message) {
    const response = JSON.parse(message)
    const asset = response.data
    this.resumable.removeFile(file)
    this.props.onUpdateAsset(file.uniqueIdentifier, asset)
  }

  _handleUpdate(e) {
    const { value } = e.target
    this.setState({ value })
  }

}

export default TextArea
