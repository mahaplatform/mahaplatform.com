import { AsYouType, parsePhoneNumberFromString } from 'libphonenumber-js'
import PropTypes from 'prop-types'
import Button from '../../button'
import KeyPad from '../../keypad'
import React from 'react'

class Dialer extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    phone: PropTypes.object,
    tasks: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    program: PropTypes.object
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
  _handlePlace = this._handlePlace.bind(this)
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
            <Button { ...this._getCall() } />
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

  _getCall() {
    const { number } = this.state
    return {
      icon: 'phone',
      disabled: !number,
      type: 'call',
      handler: this._handlePlace
    }
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

  _handleCall(client) {
    const { channels, number } = this.state
    const { program } = this.props
    const contact = channels.length > 0 ? channels[0].contact : null
    this.context.phone.call({
      client,
      contact,
      number,
      program
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

  _handleKeyPress(e) {
    if(e.charCode !== 13) return
    this._handleCall()
  }

  _handlePlace() {
    if(!this.state.number) return
    this.context.tasks.open({
      items: [
        { label: 'Call with Cell phone', handler: this._handleCall.bind(this, 'cell') },
        { label: 'Call with Maha phone', handler: this._handleCall.bind(this, 'maha') },
      ]
    })
  }

  _handleType(e) {
    this._handleFormat(e.target.value)
  }

}

export default Dialer
