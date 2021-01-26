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
  _handleError = this._handleRemove.bind(this)
  _handleIncoming = this._handleIncoming.bind(this)
  _handleMute = this._handleMute.bind(this)
  _handleProgram = this._handleProgram.bind(this)
  _handleReady = this._handleReady.bind(this)
  _handleRemove = this._handleError.bind(this)

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
        ...call.connection.parameters.CallSid === CallSid ? {
          status: 'in-progress'
        } : {}
      }))
    })
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
        onSuccess: (data) => {
          console.log(data)
        }
      })
    }
  }

  _handleError(error) {
    this.setState({ error })
  }

  _handleIncoming(connection) {
    const { calls } = this.state
    this.setState({
      calls: [
        ...calls,
        {
          connection,
          from: connection.parameters.from,
          to_user: call.user,
          to: config.number,
          direction: 'inbound',
          muted: false,
          started_at: moment(),
          status: 'ringing'
        }
      ]
    })
    connection.on('accept', this._handleAccept)
    connection.on('cancel', this._handleRemove.bind(this, connection))
    connection.on('disconnect', this._handleRemove)
    connection.on('error', this._handleError)
    connection.on('mute', this._handleMute)
    connection.on('reject', this._handleRemove.bind(this, connection))
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
    window.Twilio.Device.on('ready', this._handleReady.bind(this))
  }

  _handleMute(muted, connection) {
    const { CallSid } = connection.parameters
    const { calls } = this.state
    this.setState({
      calls: calls.map(call => ({
        ...call,
        ...call.connection.parameters.CallSid === CallSid ? { muted } : {}
      }))
    })
  }

  _handleOutgoing(call, config, connection) {
    const { admin } = this.context
    const { calls, program } = this.state
    this.setState({
      calls: [
        ...calls,
        {
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
        }
      ]
    })
    connection.on('cancel', this._handleRemove.bind(this, connection))
    connection.on('disconnect', this._handleRemove)
    connection.on('error', this._handleError)
    connection.on('mute', this._handleMute)
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

  _handleReady() {}

  _handleRemove(connection) {
    const { CallSid } = connection.parameters
    const { calls } = this.state
    this.setState({
      calls: calls.filter(call => {
        return call.connection.parameters.CallSid !== CallSid
      })
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
