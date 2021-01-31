import { Container, Dependencies } from '@admin'
import PropTypes from 'prop-types'
import Phone from '../newphone'
import Empty from './empty'
import moment from 'moment'
import React from 'react'
import _ from 'lodash'

class PhoneRoot extends React.Component {

  static childContextTypes = {
    phone: PropTypes.object
  }

  static contextTypes = {
    admin: PropTypes.object,
    flash: PropTypes.object,
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
  _handleForward = this._handleForward.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleHold = this._handleHold.bind(this)
  _handleIncoming = this._handleIncoming.bind(this)
  _handleMute = this._handleMute.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleReject = this._handleReject.bind(this)
  _handleStatus = this._handleStatus.bind(this)
  _handleSwap = this._handleSwap.bind(this)
  _handleTransfer = this._handleTransfer.bind(this)
  _handleUnhold = this._handleUnhold.bind(this)

  render() {
    const { programs } = this.props
    return (
      <>
        { programs.length > 0 ?
          <Phone { ...this._getPhone() } /> :
          <Empty { ...this._getEmpty() } />
        }
      </>
    )
  }

  componentDidMount() {
    this._handleInit()
  }

  getChildContext() {
    return {
      phone: {
        accept: this._handleAccept,
        call: this._handleCall,
        hangup: this._handleHangup,
        hold: this._handleHold,
        forward: this._handleForward,
        mute: this._handleMute,
        reject: this._handleReject,
        swap: this._handleSwap,
        transfer: this._handleTransfer,
        unhold: this._handleUnhold
      }
    }
  }

  _getEmpty() {
    return {
      onClose: this._handleClose
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

  _handleAccept(call, callback) {
    call.connection.accept()
    this._handleUpdate(call.call.sid, {
      status: 'in-progress-contact',
      answered: true
    }, callback)
  }

  _handleAdd(call) {
    const { calls } = this.state
    this.setState({
      calls: [
        ...calls,
        {
          ...call,
          focused: calls.length === 0,
          held: false,
          muted: false,
          transfering: null,
          status: 'ringing',
          started_at: moment()
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
        client: 'cell',
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
          client: 'maha',
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

  _handleForward(call, client, callback) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/forward',
      method: 'post',
      body: {
        from: call.call.program.phone_number.number,
        client,
        sid: call.direction === 'inbound' ? call.from_sid : call.to_sid
      },
      onSuccess: () => {
        this._handleUpdate(call.call.sid, {
          forwarding: {
            client
          }
        }, callback)
      }
    })
  }

  _handleHangup(call) {
    const { direction, held, to_sid, from_sid } = call
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/hangup',
      method: 'post',
      body: {
        sid: (direction === 'outbound' || !held) ? to_sid : from_sid
      },
      onSuccess: () => this._handleRemove(call.call.sid),
      onFailure: () => this.context.flash.set('error', 'Unable to hangup call')
    })
  }

  _handleHold(call, callback) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/hold',
      method: 'post',
      body: {
        queue: `contact-${call.call.contact.id}`,
        sid: call.direction === 'inbound' ? call.from_sid : call.to_sid
      },
      onSuccess: () => {
        this._handleUpdate(call.call.sid, {
          held: true
        })
        if(callback) callback()
      }
    })
  }

  _handleIncoming(connection) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/lookup',
      method: 'post',
      body: {
        sid: connection.parameters.CallSid
      },
      onSuccess: (result) => {
        const { parent_sid, call } = result.data
        console.log(parent_sid, connection.parameters.CallSid)
        this._handleAdd({
          client: 'maha',
          extra: this._getParams(connection.customParameters),
          answered: false,
          connection,
          call,
          direction: 'inbound',
          from_sid: parent_sid,
          to_sid: connection.parameters.CallSid
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

  _handleMute(call) {
    const { muted } = call
    call.connection.mute(!muted)
    this._handleUpdate(call.call.sid, {
      muted: !muted
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
          client: body.client,
          call: result.data,
          direction: 'outbound',
          from_sid: result.data.sid
        })
      }
    })
  }

  _handleReject(call) {
    call.connection.reject()
    this._handleRemove(call.call.sid)
  }

  _handleRemove(sid) {
    const call = this.state.calls.find(call => {
      return call.call.sid === sid
    })
    this._handleLeave(call.call.sid)
    const calls = this.state.calls.filter(call => {
      return call.call.sid !== sid
    })
    this.setState({ calls }, () => {
      if(calls.length === 0) return
      this._handleUpdate(calls[0].call.sid, {
        focused: true
      })
    })
  }

  _getSignal(call, data) {
    const { direction, status } = data
    if(call.held) return 'in-progress-contact'
    if(call.transfering) {
      if(status === 'initiated') return 'initiated-transfer'
      if(status === 'ringing') return 'ringing-transfer'
      if(status === 'in-progress') return 'in-progress-transfer'
      if(status === 'no-answer') return 'no-answer-transfer'
      if(status === 'completed') return 'completed-transfer'
    }
    if(call.forwarding) {
      if(status === 'initiated') return 'initiated-forward'
      if(status === 'ringing') return 'ringing-forward'
      if(status === 'in-progress') return 'in-progress-forward'
      if(status === 'no-answer') return 'no-answer-forward'
      if(status === 'completed') return 'completed-forward'
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
  }

  _handleStatus(data) {
    const { calls } = this.state
    const { parent_sid } = data
    const call = calls.find(call => {
      return call.call.sid === parent_sid
    })
    if(!call) return
    const status = this._getSignal(call, data)
    if(!status) return
    if(data.sid === (call.direction === 'inbound' ? call.from_sid : call.to_sid) && data.status === 'completed') {
      return this._handleRemove(call.call.sid)
    } else if(_.includes(['no-answer-transfer','completed-contact','completed-forward'], status)) {
      return this._handleRemove(call.call.sid)
    } else if(_.includes(['cell','maha'], call.client) && status === 'initiated-contact') {
      return this._handleUpdate(call.call.sid, { to_sid: data.sid, status })
    } else if(_.includes(['completed-contact','in-progress-transfer'], status)) {
      return this._handleRemove(call.call.sid)
    } else {
      this._handleUpdate(parent_sid, {
        status
      })
    }
  }

  _handleSwap(newcall) {
    const focused = this.state.calls.find(call => {
      return call.focused
    })
    this._handleHold(focused, () => {
      this._handleUpdate(focused.call.sid, {
        focused: false
      }, () => {
        this._handleUpdate(newcall.call.sid, {
          focused: true
        }, () => {
          if(!newcall.answered) {
            this._handleAccept(newcall)
          }
          if(newcall.held) {
            this._handleUnhold(newcall)
          }
        })
      })
    })
  }

  _handleTransfer(call, data, callback) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/transfer',
      method: 'post',
      body: {
        from: call.call.program.phone_number.number,
        user_id: data.user_id,
        number: data.number,
        sid: call.direction === 'inbound' ? call.from_sid : call.to_sid
      },
      onSuccess: () => {
        this._handleUpdate(call.call.sid, {
          transfering: {
            number: data.number,
            user: data.user
          }
        }, callback)
      }
    })
  }

  _handleUnhold(call, callback) {
    const connection = window.Twilio.Device.connect({
      config: btoa(JSON.stringify({
        from: call.call.program.phone_number.number,
        queue: `contact-${call.call.contact.id}`
      }))
    })
    connection.on('accept', (connection) => {
      const sidkey = call.direction === 'outbound' ? 'from_sid' : 'to_sid'
      this._handleUpdate(call.call.sid, {
        [sidkey]: connection.parameters.CallSid,
        connection,
        held: false
      }, callback)
    })
  }

  _handleUpdate(sid, data, callback) {
    const { calls } = this.state
    this.setState({
      calls: calls.map(call => ({
        ...call,
        ...call.call.sid === sid ? data : {}
      }))
    }, callback)
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
