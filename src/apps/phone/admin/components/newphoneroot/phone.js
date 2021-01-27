import PropTypes from 'prop-types'
import Phone from '../newphone'
import React from 'react'

class PhoneRoot extends React.Component {

  static childContextTypes = {
    phone: PropTypes.object
  }

  static contextTypes = {
    network: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array,
    program: PropTypes.object,
    token: PropTypes.string,
    onClose: PropTypes.func,
    onProgram: PropTypes.func
  }

  state = {
    calls: [],
    error: null
  }

  _handleCall = this._handleCall.bind(this)
  _handleIncoming = this._handleIncoming.bind(this)

  render() {
    return (
      <Phone { ...this._getPhone() } />
    )
  }

  componentDidMount() {
    this._handleInit()
  }

  getChildContext() {
    return {
      phone: {
        onCall: this._handleCall
      }
    }
  }

  _getPhone() {
    const { programs, program, onClose, onProgram } = this.props
    const { calls, error } = this.state
    return {
      calls,
      error,
      programs,
      program,
      onClose,
      onProgram
    }
  }

  _handleInit() {
    const { token } = this.props
    window.Twilio.Device.setup(token, {
      allowIncomingWhileBusy: true,
      fakeLocalDTMF: true
    })
    window.Twilio.Device.audio.incoming(false)
    window.Twilio.Device.audio.outgoing(false)
    window.Twilio.Device.audio.disconnect(false)
    window.Twilio.Device.on('incoming', this._handleIncoming)
  }

  _handleCall(call) {
    console.log('call', call)
  }

  _handleIncoming() {
    console.log('handling incoming')
  }

}

export default PhoneRoot
