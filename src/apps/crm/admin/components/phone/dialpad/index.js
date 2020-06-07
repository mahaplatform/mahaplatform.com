import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'
import PropTypes from 'prop-types'
import KeyPad from '../keypad'
import React from 'react'

class DialPad extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    phone: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array,
    program: PropTypes.object,
    status: PropTypes.string
  }

  state = {
    number: '',
    formatted: '',
    value: ''
  }

  _handleCall = this._handleCall.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleDial = this._handleDial.bind(this)
  _handleKeyPress = this._handleKeyPress.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-phone-dialpad">
        <div className="maha-phone-dialpad-header">
          <div className="maha-input">
            <div className="maha-input-field">
              <input { ...this._getInput() } />
            </div>
            { value &&
              <div className="maha-input-clear" onClick={ this._handleClear }>
                <i className="fa fa-times" />
              </div>
            }
          </div>
        </div>
        <div className="maha-phone-dialpad-body">
          <KeyPad { ...this._getKeyPad() } />
          <div className="maha-phone-dialpad-action">
            <div className={ this._getButtonClass() } onClick={ this._handleCall }>
              <i className="fa fa-phone" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getButtonClass() {
    const { number } = this.state
    const classes = ['maha-phone-dialpad-call']
    if(!number) classes.push('disabled')
    return classes.join(' ')
  }

  _getInput() {
    const { formatted } = this.state
    return {
      placeholder: 'Enter Number',
      ref: node => this.input = node,
      type: 'text',
      value: formatted,
      onChange: this._handleType,
      onKeyPress: this._handleKeyPress
    }
  }

  _getKeyPad() {
    return {
      onChoose: this._handleDial
    }
  }

  _handleCall() {
    const { program } = this.props
    const { number } = this.state
    if(!number) return
    this.context.phone.call({
      program,
      to: number
    })
  }

  _handleClear() {
    this.setState({
      number: '',
      formatted: '',
      value: ''
    })
  }

  _handleDial(number) {
    const { value } = this.state
    this._handleFormat(value + number)
  }

  _handleKeyPress(e) {
    if(e.charCode !== 13) return
    this._handleCall()
  }

  _handleFormat(value) {
    const asyoutype = new AsYouType('US')
    const formatted = asyoutype.input(value)
    const parsed = parsePhoneNumberFromString(formatted, 'US')
    const valid = parsed && parsed.isValid()
    const number = valid ? parsed.number : null
    this.setState({ number, formatted, value })
  }

  _handleType(e) {
    this._handleFormat(e.target.value)
  }

}

export default DialPad
