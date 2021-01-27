import { Container, Dependencies } from '@admin'
import PropTypes from 'prop-types'
import Phone from './phone'
import moment from 'moment'
import React from 'react'

class PhoneRoot extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    programs: PropTypes.array,
    token: PropTypes.string
  }

  state = {
    calls: [],
    error: null,
    program: null
  }

  _handleAccept = this._handleAccept.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleError = this._handleError.bind(this)
  _handleIncoming = this._handleIncoming.bind(this)
  _handleMute = this._handleMute.bind(this)
  _handleProgram = this._handleProgram.bind(this)
  _handleRemove = this._handleRemove.bind(this)
  _handleStatus = this._handleStatus.bind(this)
  _handleThrough = this._handleThrough.bind(this)

  render() {
    return (
      <Phone { ...this._getPhone() } />
    )
  }

  componentDidMount() {
    const { programs } = this.props
    this._handleInit()
    this._handleProgram(programs[0])
  }

  _getIdentify(call) {
    if(call.contact) return { name: call.contact.display_name }
    if(call.user) return { name: call.user.full_name }
    return { number: call.number }
  }

  _getPhone() {
    const { error, calls, program } = this.state
    const { programs } = this.props
    return {
      calls,
      error,
      programs,
      program,
      onProgram: this._handleProgram,
      onCall: this._handleCall
    }
  }

  _handleAccept(connection) {
    const { CallSid } = connection.parameters
    const { calls } = this.state
    this.setState({
      calls: calls.map(call => ({
        ...call,
        ...call.sid === CallSid ? {
          status: 'in-progress'
        } : {}
      }))
    })
  }

  _handleAdd(call) {
    const { connection } = call
    const { calls } = this.state
    call.sid = call.sid || connection.parameters.CallSid
    this.setState({
      calls: [ ...calls, call ]
    })
    this._handleJoin(call.sid)
    if(!connection) return
    connection.on('accept', this._handleAccept)
    connection.on('cancel', this._handleRemove.bind(this, connection))
    connection.on('disconnect', this._handleRemove)
    connection.on('error', this._handleError)
    connection.on('mute', this._handleMute)
    connection.on('reject', this._handleRemove.bind(this, connection))
  }

  _handleCall(call) {
    const { admin, network } = this.context
    const { program } = this.state
    const config = btoa(JSON.stringify({
      caller_id: admin.user.id,
      contact_id: call.contact ? call.contact.id : null,
      user_id: call.user ? call.user.id : null,
      from: program.phone_number.number,
      number: call.number,
      client: call.client,
      identify: call.through ? this._getIdentify(call) : null,
      through: call.through
    }))
    if(!call.through) {
      const connection = window.Twilio.Device.connect({ config })
      connection.on('accept', this._handleOutgoing.bind(this, call, config))
    } else {
      network.request({
        endpoint: '/api/admin/phone/calls',
        method: 'post',
        body: { config },
        onSuccess: ({ data }) => this._handleThrough(call, config, data)
      })
    }
  }

  _handleError(error) {
    this.setState({ error })
  }

  _handleIncoming(connection) {
    const { program } = this.props
    const { admin } = this.context
    this._handleAdd({
      connection,
      from: connection.parameters.from,
      to_user: admin.user,
      to: program.number,
      direction: 'inbound',
      muted: false,
      started_at: moment(),
      status: 'ringing'
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

  _handleOutgoing(call, config, connection) {
    const { admin } = this.context
    const { program } = this.state
    this._handleAdd({
      connection,
      contact: call.contact,
      direction: 'outbound',
      from: program.phone_number.number,
      from_user: admin.user,
      to_user: call.user,
      to: config.number,
      muted: false,
      started_at: moment(),
      status: 'ringing'
    })
  }

  _handleProgram(program) {
    this.setState({
      program: {
        ...program,
        phone_number: {
          id: 1,
          formatted: '(607) 246-2347',
          number: '+16072462347'
        }
      }
    })
  }

  _handleRemove(connection) {
    const { CallSid } = connection.parameters
    const { calls } = this.state
    this._handleLeave(CallSid)
    this.setState({
      calls: calls.filter(call => {
        return call.sid !== CallSid
      })
    })
  }

  _handleStatus(data) {
    console.log(data)
    const { calls } = this.state
    const sid = data.parent_sid || data.sid
    const status = data.status
    this.setState({
      calls: calls.map(call => ({
        ...call,
        ...call.sid === sid ? { status } : {}
      }))
    })
  }

  _handleThrough(call, config, twcall) {
    const { admin } = this.context
    const { program } = this.state
    this._handleAdd({
      sid: twcall.sid,
      contact: call.contact,
      direction: 'outbound',
      from: program.phone_number.number,
      from_user: admin.user,
      to_user: call.user,
      to: config.number,
      muted: false,
      started_at: moment(),
      status: call.status
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
