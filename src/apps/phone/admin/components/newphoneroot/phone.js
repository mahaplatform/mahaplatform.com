import PropTypes from 'prop-types'
import Phone from '../newphone'
import moment from 'moment'
import React from 'react'

class PhoneRoot extends React.Component {

  static childContextTypes = {
    phone: PropTypes.object
  }

  static contextTypes = {
    modal: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    token: PropTypes.string
  }

  state = {
    calls: [],
    error: null
  }

  _handleCall = this._handleCall.bind(this)
  _handleClose = this._handleClose.bind(this)
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
    const { calls, error } = this.state
    return {
      calls,
      error,
      onClose: this._handleClose
    }
  }

  _handleAdd(call) {
    const { connection } = call
    const { calls } = this.state
    if(connection) call.sid = connection.parameters.CallSid
    this.setState({
      calls: [ ...calls, call ]
    })
    // this._handleJoin(call.sid)
    // if(!connection) return
    // connection.on('accept', this._handleAccept)
    // connection.on('cancel', this._handleRemove.bind(this, connection))
    // connection.on('disconnect', this._handleRemove)
    // connection.on('error', this._handleError)
    // connection.on('mute', this._handleMute)
    // connection.on('reject', this._handleRemove.bind(this, connection))
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

  _handleClose() {
    this.context.modal.close()
  }

  _handleIncoming(connection) {
    const { network } = this.context
    const { CallSid } = connection.parameters
    network.request({
      endpoint: '/api/admin/phone/calls/lookup',
      method: 'post',
      body: { sid: CallSid },
      onSuccess: (result) => {
        const call = result.data
        this._handleAdd({
          connection,
          call,
          direction: 'incoming',
          muted: false,
          started_at: moment(),
          status: 'ringing'
        })
      }
    })
  }

}

export default PhoneRoot
