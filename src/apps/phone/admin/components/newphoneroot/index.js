import { Container, Dependencies } from '@admin'
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
    programs: PropTypes.array,
    token: PropTypes.string
  }

  state = {
    calls: [],
    error: null
  }

  _handleAccept = this._handleAccept.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleError = this._handleError.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleHold = this._handleHold.bind(this)
  _handleIncoming = this._handleIncoming.bind(this)
  _handleMute = this._handleMute.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleStatus = this._handleStatus.bind(this)
  _handleTransfer = this._handleTransfer.bind(this)
  _handleUnhold = this._handleUnhold.bind(this)

  render() {
    return <Phone { ...this._getPhone() } />
  }

  componentDidMount() {
    this._handleInit()
  }

  getChildContext() {
    return {
      phone: {
        onCall: this._handleCall,
        onHangup: this._handleHangup,
        onHold: this._handleHold,
        onTransfer: this._handleTransfer,
        onUnhold: this._handleUnhold
      }
    }
  }

  _getPhone() {
    const { calls, error } = this.state
    const { programs } = this.props
    return {
      programs,
      calls,
      error,
      onClose: this._handleClose
    }
  }

  _handleAccept(connection) {
    const { CallSid } = connection.parameters
    this.setState({
      calls: this.state.calls.map(call => ({
        ...call,
        ...call.sid === CallSid ? {
          status: 'in-progress'
        } : {}
      }))
    })
  }

  _handleAdd(call) {
    console.log(call.params)
    this.setState({
      calls: [
        ...this.state.calls,
        {
          ...call,
          held: false,
          muted: false,
          transfering: null,
          status: 'ringing',
          started_at: moment(),
          onHold: this._handleHold
        }
      ]
    })
    this._handleJoin(call.call.sid)
  }

  _handleCall(call) {
    const { client, contact, program, number } = call
    const config = btoa(JSON.stringify({
      identify: client === 'cell' ? (contact ? { name: contact.full_name, number } : { number }) : null,
      from: program.phone_number.number,
      number
    }))
    if(client === 'cell') {
      this._handleOutgoing({
        type: 'outbound-cell',
        config,
        direction: 'outbound',
        from: program.phone_number.number,
        to: number
      })
    }
    if(client === 'maha') {
      const connection = window.Twilio.Device.connect({ config })
      connection.on('accept', (connection) => {
        this._handleOutgoing({
          type: 'outbound-maha',
          sid: connection.parameters.CallSid,
          direction: 'outbound',
          from: program.phone_number.number,
          to: number
        }, connection)
      })
    }
  }

  _handleClose() {
    this.context.modal.close()
  }

  _handleError(error) {
    this.setState({ error })
  }

  _handleHold(call) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/hold',
      method: 'post',
      body: {
        queue: `contact-${call.call.contact.id}`,
        sid: call.call.sid
      },
      onSuccess: () => {
        this._handleUpdate(call.call.sid, {
          held: true
        })
      }
    })
  }

  _handleIncoming(connection) {
    connection.on('accept', this._handleAccept)
    connection.on('error', this._handleError)
    connection.on('mute', this._handleMute)
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/lookup',
      method: 'post',
      body: {
        sid: connection.parameters.CallSid
      },
      onSuccess: (result) => {
        this._handleAdd({
          extra: this._getParams(connection.customParameters),
          type: 'inbound',
          connection,
          call: result.data,
          direction: 'inbound',
        })
      }
    })
  }

  _getParams(params) {
    const extra = {}
    params.forEach((value, key) => {
      extra[key] = value
    })
    return extra
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

  _handleHangup(call) {
    call.connection.disconnect()
    this._handleRemove(call.call.sid)
  }

  _handleJoin(sid) {
    const { network } = this.context
    const target = `/calls/${sid}`
    network.join(target)
    network.subscribe([
      { target, action: 'callstatus', handler: this._handleStatus }
    ])
  }

  _handleLeave(sid) {
    const { network } = this.context
    const target = `/calls/${sid}`
    network.leave(target)
    network.subscribe([
      { target, action: 'callstatus', handler: this._handleStatus }
    ])
  }

  _handleMute(muted, connection) {
    const { CallSid } = connection.parameters
    const { calls } = this.state
    this.setState({
      calls: calls.map(call => ({
        ...call,
        ...call.sid === CallSid ? { muted } : {}
      }))
    })
  }

  _handleOutgoing(body, connection) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls',
      method: 'post',
      body,
      onSuccess: (result) => {
        this._handleAdd({
          connection,
          type: body.type,
          call: result.data,
          direction: 'outbound',
        })
      }
    })
  }

  _handleRemove(sid) {
    const { calls } = this.state
    const call = calls.find(call => {
      return call.call.sid === sid
    })
    this._handleLeave(call.call.sid)
    this.setState({
      calls: calls.filter(call => {
        return call.call.sid !== sid
      })
    })
  }

  _getAction(call, data) {
    const { direction, status, to } = data
    if(call.held) return 'in-progress-contact'
    if(call.transfering) {
      if(status === 'initiated') return 'initiated-transfer'
      if(status === 'ringing') return 'ringing-transfer'
      if(status === 'in-progress') return 'in-progress-transfer'
      if(status === 'no-answer') return 'no-answer-transfer'
      if(status === 'completed') return 'completed-transfer'
    }
    if(direction === 'outbound-api') {
      if(status === 'ringing') return 'ringing-cell'
      if(status === 'in-progress') return 'announcing-cell'
      if(status === 'completed') return 'completed-cell'
    }
    if(direction === 'outbound-dial') {
      if(status === 'initiated') return 'initiated-contact'
      if(status === 'ringing') return 'ringing-contact'
      if(status === 'in-progress') return 'in-progress-contact'
      if(status === 'completed') return 'completed-contact'
      if(status === 'no-answer') return 'no-answer-contact'
    }
    if(direction === 'inbound') {
      if(status === 'completed') return 'completed-contact'
    }
    console.log(direction, status)
    console.log(call, data)
  }

  _handleStatus(data) {
    const { calls } = this.state
    const { parent_sid } = data
    const call = calls.find(call => {
      return call.call.sid === parent_sid
    })
    if(!call) return
    const status = this._getAction(call, data)
    if(!status) return
    if(_.includes(['no-answer-transfer','in-progres-transfer','completed-contact'], status)) {
      return this._handleHangup(call)
    } else if(_.includes(['completed-contact'], status)) {
      return this._handleRemove(call.call.sid)
    } else {
      console.log(data.status, status)
      this._handleUpdate(parent_sid, {
        sid: data.sid,
        status
      })
    }
  }

  _handleTransfer(call, data) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/transfer',
      method: 'post',
      body: {
        from: call.call.program.phone_number.number,
        user_id: data.user_id,
        number: data.number,
        sid: call.call.sid
      },
      onSuccess: () => {
        this._handleUpdate(call.call.sid, {
          transfering: {
            user: data.user
          }
        })
      }
    })
  }

  _handleUnhold(call) {
    const connection = window.Twilio.Device.connect({
      config: btoa(JSON.stringify({
        from: call.call.program.phone_number.number,
        queue: `contact-${call.call.contact.id}`
      }))
    })
    connection.on('accept', (connection) => {
      this._handleUpdate(call.call.sid, {
        connection,
        held: false
      })
    })
  }

  _handleUpdate(sid, data) {
    const { calls } = this.state
    this.setState({
      calls: calls.map(call => ({
        ...call,
        ...call.call.sid === sid ? data : {}
      }))
    })
  }

}

const mapResources = (props, context) => ({
  programs: {
    endpoint: '/api/admin/crm/programs',
    filter: {
      phone_number_id: { $nnl: true },
      access_type: { $in: ['manage','edit'] }
    }
  },
  token: '/api/admin/phone/calls/token'
})

const dependencies = {
  scripts: [
    { url: `${process.env.WEB_ASSET_CDN_HOST}/js/twilio.min.js`, check: 'Twilio.Device' }
  ]
}

PhoneRoot = Container(mapResources)(PhoneRoot)

PhoneRoot = Dependencies(dependencies)(PhoneRoot)

export default PhoneRoot
