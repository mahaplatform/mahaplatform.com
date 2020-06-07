import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'
import PropTypes from 'prop-types'
import KeyPad from '../keypad'
import React from 'react'

class dialer extends React.Component {

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
    channels: [],
    number: '',
    formatted: '',
    value: ''
  }

  _handleCall = this._handleCall.bind(this)
  _handleClear = this._handleClear.bind(this)
  _handleDial = this._handleDial.bind(this)
  _handleFetch = this._handleFetch.bind(this)
  _handleKeyPress = this._handleKeyPress.bind(this)
  _handleType = this._handleType.bind(this)

  render() {
    const { value } = this.state
    return (
      <div className="maha-phone-dialer">
        <div className="maha-phone-dialer-header">
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
        <div className="maha-phone-dialer-contact">
          { this._getChannels() }
        </div>
        <div className="maha-phone-dialer-body">
          <KeyPad { ...this._getKeyPad() } />
          <div className="maha-phone-dialer-action">
            <div className={ this._getButtonClass() } onClick={ this._handleCall }>
              <i className="fa fa-phone" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidUpdate(prevProps, prevState) {
    const { number } = this.state
    if(number !== prevState.number && number) {
      this._handleFetch()
    }
  }

  _getButtonClass() {
    const { number } = this.state
    const classes = ['maha-phone-dialer-call']
    if(!number) classes.push('disabled')
    return classes.join(' ')
  }

  _getChannels() {
    const { channels } = this.state
    if(channels.length === 0) return null
    const output = [`${channels[0].contact.display_name}`]
    if(channels.length > 1) output.push(`${channels.length-1} others`)
    return output.join(' or ')
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
    const { channels, number } = this.state
    if(!number) return
    this.context.phone.call({
      program,
      to: number,
      phone_number: channels.length > 0 ? channels[0].phone_number : null,
      contact: channels.length > 0 ? channels[0].contact : null
    })
  }

  _handleClear() {
    this.setState({
      channels: [],
      number: '',
      formatted: '',
      value: ''
    })
  }

  _handleDial(number) {
    const { value, valid } = this.state
    if(valid) return
    this._handleFormat(value + number)
  }

  _handleKeyPress(e) {
    if(e.charCode !== 13) return
    this._handleCall()
  }

  _handleFetch() {
    const { program } = this.props
    const { number } = this.state
    this.context.network.request({
      endpoint: `/api/admin/crm/programs/${program.id}/channels/voice/lookup`,
      method: 'GET',
      query: { number },
      onSuccess: ({ data }) => {
        this.setState({
          channels: data
        })
      }
    })
  }

  _handleFormat(value) {
    const asyoutype = new AsYouType('US')
    const formatted = asyoutype.input(value)
    const parsed = parsePhoneNumberFromString(formatted, 'US')
    const valid = parsed && parsed.isValid()
    const number = valid ? parsed.number : null
    const channels = []
    this.setState({ channels, number, formatted, value })
  }

  _handleType(e) {
    this._handleFormat(e.target.value)
  }

}

export default dialer
