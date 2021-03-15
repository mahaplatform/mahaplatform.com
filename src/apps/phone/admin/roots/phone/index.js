import Phone from '@apps/phone/admin/components/phone'
import { Container, Dependencies } from '@admin'
import PropTypes from 'prop-types'
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
    children: PropTypes.object,
    programs: PropTypes.array,
    token: PropTypes.string
  }

  state = {
    calls: [],
    error: null,
    open: false,
    program_id: null
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
  _handleOpen = this._handleOpen.bind(this)
  _handleProgram = this._handleProgram.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleReject = this._handleReject.bind(this)
  _handleStatus = this._handleStatus.bind(this)
  _handleSwap = this._handleSwap.bind(this)
  _handleToggle = this._handleToggle.bind(this)
  _handleTransfer = this._handleTransfer.bind(this)
  _handleUnhold = this._handleUnhold.bind(this)

  render() {
    const { programs } = this.props
    const { open } = this.state
    return (
      <div className="maha-phone">
        <div className="maha-phone-main">
          { this.props.children }
        </div>
        { open &&
          <div className="maha-phone-sidebar">
            { programs.length > 0 ?
              <Phone { ...this._getPhone() } /> :
              <Empty { ...this._getEmpty() } />
            }
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    const { programs } = this.props
    if(programs.length > 0) this._handleProgram(programs[0].id)
    this._handleInit()
    this._handleJoin()
  }

  componentWillUnmount() {
    this._handleLeave()
  }

  getChildContext() {
    return {
      phone: {
        accept: this._handleAccept,
        call: this._handleCall,
        forward: this._handleForward,
        hangup: this._handleHangup,
        hold: this._handleHold,
        mute: this._handleMute,
        open: this._handleOpen,
        reject: this._handleReject,
        swap: this._handleSwap,
        toggle: this._handleToggle,
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

  _getParams(params) {
    const extra = {}
    params.forEach((value, key) => {
      extra[key] = value
    })
    return extra
  }

  _getPhone() {
    const { calls, error } = this.state
    const { programs } = this.props
    return {
      calls,
      error,
      programs,
      program: this._getProgram(),
      onClose: this._handleClose,
      onProgram: this._handleProgram
    }
  }

  _getProgram() {
    const { program_id } = this.state
    const { programs } = this.props
    return programs.find(program => {
      return program.id === program_id
    })
  }

  _handleAccept(call, callback) {
    call.connection.accept()
    this._handleUpdate(call.call.sid, {
      status: 'in-progress-contact',
      answered: true
    }, () => {
      if(callback) callback()
    })
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
          transfering_sid: null,
          transfering: null,
          status: 'ringing',
          started_at: moment()
        }
      ],
      open: true,
      program_id: call.call.program.id
    })
  }

  _handleCall(call) {
    const { client, contact, program, number } = call
    const config = btoa(JSON.stringify({
      identify: client === 'cell' ? (contact ? { name: contact.full_name, number } : { number }) : null,
      from: program.phone_number.number,
      number
    }))
    if(client === 'cell') this._handleCallCell(call, config)
    if(client === 'maha') this._handleCallMaha(call, config)
  }

  _handleCallCell(call, config) {
    this._handleOutgoing({
      client: 'cell',
      action: 'call',
      config,
      direction: 'outbound',
      from: call.program.phone_number.number,
      to: call.number
    })
  }

  _handleCallMaha(call, config) {
    const connection = window.Twilio.Device.connect({ config })
    connection.on('accept', (connection) => {
      this._handleOutgoing({
        client: 'maha',
        action: 'call',
        sid: connection.parameters.CallSid,
        direction: 'outbound',
        from: call.program.phone_number.number,
        to: call.number
      }, connection)
    })
  }

  _handleClose() {
    this.setState({
      open: false
    })
  }

  _handleError(error) {
    this.setState({ error })
  }

  _handleForward(call, client, callback) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/forward',
      method: 'post',
      body: {
        call_sid: call.call.sid,
        from: call.call.program.phone_number.number,
        sid: call.remote_sid,
        client
      },
      onSuccess: (result) => {
        this._handleUpdate(call.call.sid, {
          client,
          local_sid: result.data.sid
        }, callback)
      }
    })

  }

  _handleHangup(call) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/hangup',
      method: 'post',
      body: {
        call_sid: call.call.sid,
        sid: call.remote_sid
      },
      onSuccess: () => {
        this._handleRemove({
          sid: call.call.sid
        })
      },
      onFailure: () => this.context.flash.set('error', 'Unable to hangup call')
    })
  }

  _handleHold(call, callback) {
    const { remote_sid } = call
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/hold',
      method: 'post',
      body: {
        call_sid: call.call.sid,
        sid: remote_sid
      },
      onSuccess: () => {
        this._handleUpdate(call.call.sid, {
          held: true,
          local_sid: null
        })
        if(callback) callback()
      }
    })
  }

  _handleIncoming(connection) {
    const params = this._getParams(connection.customParameters)
    if(params.action === 'new') this._handleIncomingNew(connection, params)
    if(params.action === 'forward') this._handleIncomingForward(connection, params)
    if(params.action === 'transfer') this._handleIncomingTransfer(connection, params)
    if(params.action === 'unhold') this._handleIncomingUnhold(connection, params)
  }

  _handleIncomingNew(connection, params) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/lookup',
      method: 'post',
      body: {
        sid: connection.parameters.CallSid
      },
      onSuccess: (result) => {
        const { parent_sid, call } = result.data
        this._handleAdd({
          client: 'maha',
          action: 'new',
          extra: params,
          answered: false,
          connection,
          call,
          direction: 'inbound',
          remote_sid: parent_sid,
          local_sid: connection.parameters.CallSid
        })
      }
    })
  }

  _handleIncomingForward(connection, params) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/lookup',
      method: 'post',
      body: {
        sid: params.sid
      },
      onSuccess: (result) => {
        connection.accept()
        this._handleUpdate(result.data.call.sid, {
          connection,
          action: 'forward',
          client: 'maha',
          direction: 'inbound',
          local_sid: connection.parameters.CallSid,
          remote_sid: params.sid
        })
      }
    })
  }

  _handleIncomingTransfer(connection, params) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/lookup',
      method: 'post',
      body: {
        sid: params.sid
      },
      onSuccess: (result) => {
        const { call } = result.data
        this._handleAdd({
          client: 'maha',
          action: 'transfer',
          extra: this._getParams(connection.customParameters),
          answered: false,
          connection,
          call,
          direction: 'inbound',
          remote_sid: params.sid,
          local_sid: connection.parameters.CallSid
        })
      }
    })
  }

  _handleIncomingUnhold(connection, params) {
    connection.accept()
    const call = this.state.calls.find(call => {
      return call.call.sid === params.sid || call.remote_sid === params.sid
    })
    this._handleUpdate(call.call.sid, {
      connection,
      local_sid: connection.parameters.CallSid,
      held: false
    })
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

  _handleJoin() {
    const { network } = this.context
    const target = '/calls'
    network.join(target)
    network.subscribe([
      { target, action: 'callstatus', handler: this._handleStatus }
    ])
  }

  _handleLeave(sid) {
    const { network } = this.context
    const target = '/calls'
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

  _handleOpen() {
    this.setState({
      open: true
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
          action: body.action,
          client: body.client,
          call: result.data,
          direction: 'outbound',
          local_sid: result.data.sid,
          remote_sid: null
        })
      }
    })
  }

  _handleProgram(program_id) {
    this.setState({ program_id })
  }

  _handleReject(call) {
    call.connection.reject()
    this._handleRemove({
      sid: call.call.sid
    })
  }

  _handleRemove(params) {
    const { sid, local_sid, remote_sid, transfering_sid } = params
    const calls = this.state.calls.filter(call => {
      if(sid) return call.call.sid !== sid
      if(local_sid) return call.local_sid !== local_sid
      if(remote_sid) return call.remote_sid !== remote_sid
      if(transfering_sid) return call.transfering_sid !== transfering_sid
      return true
    })
    this.setState({ calls }, () => {
      if(calls.length === 0) return
      this._handleUpdate(calls[0].call.sid, {
        focused: true
      }, () => {
        if(!calls[0].held) return
        this._handleUnhold(calls[0])
      })
    })
  }

  _getSignal(call, data) {
    if(data.sid === call.transfering_sid) {
      if(data.status === 'initiated') return 'initiated-transfer'
      if(data.status === 'ringing') return 'ringing-transfer'
      if(data.status === 'in-progress') return 'in-progress-transfer'
      if(data.status === 'completed') return 'completed-transfer'
      if(data.status === 'busy') return 'busy-transfer'
      if(data.status === 'no-answer') return 'no-answer-transfer'
    }
    if(data.status === 'in-progress') return 'in-progress'
    return null
  }

  _handleStatus(data) {
    const { calls } = this.state
    const call = calls.find(call => {
      return call.call.sid === data.parent_sid
    })
    if(!call) return
    if(data.sid === call.transfering_sid && _.includes(['in-progress','busy','no-answer'], data.status)) {
      console.log('transfer is complete')
      this._handleRemove({
        transfering_sid: call.transfering_sid
      })
    } else if(call.action === 'call' && data.parent_sid === call.local_sid && data.status === 'in-progress') {
      console.log('connected outbound call')
      this._handleUpdate(call.call.sid, {
        remote_sid: data.sid,
        status: data.status
      })
    } else if(call.action === 'transfer' && data.sid === call.local_sid && _.includes(['no-answer','busy'], data.status)) {
      console.log('transfer didnt pick up')
      this._handleRemove({
        local_sid: data.sid
      })
    } else if(data.sid === call.remote_sid && data.status === 'completed') {
      console.log('remote hung up')
      this._handleRemove({
        remote_sid: data.sid
      })
    } else if(!call.transfering && data.sid === call.local_sid && data.status === 'completed') {
      console.log('local hung up')
      this._handleRemove({
        local_sid: data.sid
      })
    } else {
      const status = this._getSignal(call, data)
      if(status) this._handleUpdate(data.parent_sid, { status })
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

  _handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }

  _handleTransfer(call, data, callback) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/transfer',
      method: 'post',
      body: {
        call_sid: call.call.sid,
        from: call.call.program.phone_number.number,
        user_id: data.user_id,
        number: data.number,
        sid: call.remote_sid
      },
      onSuccess: (result) => {
        this._handleUpdate(call.call.sid, {
          transfering_sid: result.data.sid,
          transfering: {
            number: data.number,
            user: data.user
          }
        }, callback)
      }
    })
  }

  _handleUnhold(call, callback) {
    this.context.network.request({
      endpoint: '/api/admin/phone/calls/unhold',
      method: 'post',
      body: {
        call_sid: call.call.sid,
        sid: call.remote_sid
      },
      onSuccess: (result) => {
        if(callback) callback()
      }
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
    { url: `${process.env.ASSET_CDN_HOST}/js/twilio.min.js`, check: 'Twilio.Device' }
  ]
}

PhoneRoot = Container(mapResources)(PhoneRoot)

PhoneRoot = Dependencies(dependencies)(PhoneRoot)

export default PhoneRoot
