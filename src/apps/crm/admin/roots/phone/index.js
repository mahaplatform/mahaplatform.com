import { Container, Dependency } from 'maha-admin'
import Phone from '../../components/phone'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class PhoneContainer extends React.Component {

  static childContextTypes = {
    phone: PropTypes.object
  }

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    programs: PropTypes.any,
    token: PropTypes.any
  }

  state = {
    calls: [],
    open: false
  }

  _handleAcceptCall = this._handleAcceptCall.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleEnqueueCall = this._handleEnqueueCall.bind(this)
  _handleHangupCall = this._handleHangupCall.bind(this)
  _handleIncoming = this._handleIncoming.bind(this)
  _handleQueueCall = this._handleQueueCall.bind(this)
  _handleSwapCall = this._handleSwapCall.bind(this)
  _handleTransferCall = this._handleTransferCall.bind(this)
  _handleToggle = this._handleToggle.bind(this)

  render() {
    const { open } = this.state
    return (
      <div className="maha-phone">
        <div className="maha-phone-main">
          { this.props.children }
        </div>
        { open &&
          <div className="maha-phone-sidebar">
            <Phone { ...this._getPhone() } />
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this._handleInit()
  }

  getChildContext() {
    return {
      phone: {
        call: this._handleCall,
        toggle: this._handleToggle
      }
    }
  }

  _getParams(call) {
    const params = {}
    call.customParameters.forEach((value, key) => {
      params[key] = key === 'extra' ? JSON.parse(value) : value
    })
    return params
  }

  _getPhone() {
    const { calls } = this.state
    const { programs } = this.props
    return {
      calls,
      programs,
      onClose: this._handleClose
    }
  }

  _handleAccept(connection) {
    const { CallSid } = connection.parameters
    this._handleUpdateCall(CallSid, {
      status: 'active'
    })
  }

  _handleAcceptCall(incoming) {
    const active = this.state.calls.find(call => {
      return call.call.id !== incoming.call.id && !call.queued
    })
    if(!active) return incoming.connection.accept()
    this._handleEnqueueCall(active, () => {
      incoming.connection.accept()
    })
  }

  _handleAddCall({ connection, call, params }) {
    const { calls } = this.state
    connection.on('accept', this._handleAccept.bind(this, connection))
    connection.on('cancel', this._handleDisconnect.bind(this, connection))
    connection.on('disconnect', this._handleDisconnect.bind(this, connection))
    connection.on('error', this._handleError.bind(this, connection))
    connection.on('mute', this._handleMuted.bind(this, connection))
    connection.on('reject', this._handleReject.bind(this, connection))
    this.setState({
      calls: [
        ...calls.map(call => ({
          ...call,
          active: false
        })),
        {
          accept: this._handleAcceptCall,
          active: true,
          call,
          connection,
          enqueue: this._handleEnqueueCall,
          error: null,
          hangup: this._handleHangupCall,
          muted: false,
          params,
          queue: this._handleQueueCall,
          queued: false,
          swap: this._handleSwapCall,
          status: 'ringing',
          started_at: moment(),
          transfer: this._handleTransferCall
        }
      ],
      open: true
    })
  }

  _handleCall({ contact, phone_number, program, to }) {
    this.context.network.request({
      endpoint: '/api/admin/crm/calls',
      method: 'POST',
      body: {
        phone_number_id: phone_number ? phone_number.id : null,
        program_id: program.id,
        from: program.phone_number.number,
        to
      },
      onSuccess: ({ data }) => {
        this._handleAddCall({
          connection: window.Twilio.Device.connect({
            call_id: data.id
          }),
          call: data,
          params: {
            program_id: data.program.id,
            contact_id: data.contact ? data.contact.id : null,
            from: program.phone_number.number,
            to
          }
        })
      }
    })
  }

  _handleClose() {
    this.setState({
      open: false
    })
  }

  _handleDisconnect(connection) {
    const { CallSid } = connection.parameters
    this._handleRemoveCall(CallSid)
  }

  _handleEnqueueCall(call, callback) {
    const { connection, params } = call
    const { CallSid } = connection.parameters
    this.context.network.request({
      endpoint: `/api/admin/crm/calls/${call.call.id}/enqueue`,
      method: 'PATCH',
      body: { params },
      onSuccess: () => {
        this._handleUpdateCall(CallSid, {
          queued: true
        })
        if(callback) callback()
      }
    })
  }

  _handleError(connection, error) {
    const { CallSid } = connection.parameters
    this.setState({
      calls: this.state.calls.map((call) => {
        if(call.connection.parameters.CallSid !== CallSid) return call
        return {
          ...call,
          error
        }
      })
    })
  }

  _handleHangupCall(call) {
    const { params } = call
    this.context.network.request({
      endpoint: `/api/admin/crm/calls/${call.call.id}/hangup`,
      method: 'PATCH',
      body: { params }
    })
  }

  _handleIncoming(connection) {
    const params = this._getParams(connection)
    this.context.network.request({
      endpoint: `/api/admin/crm/contacts/${params.contact_id}/calls/${params.id}`,
      method: 'GET',
      onSuccess: ({ data }) => {
        this._handleAddCall({
          connection,
          call: data,
          params
        })
      }
    })
  }

  _handleInit() {
    const { token } = this.props
    window.Twilio.Device.setup(token, {
      allowIncomingWhileBusy: true,
      enableRingingState: true
    })
    window.Twilio.Device.audio.incoming(false)
    window.Twilio.Device.audio.outgoing(false)
    window.Twilio.Device.audio.disconnect(false)
    window.Twilio.Device.on('incoming', this._handleIncoming)
  }

  _handleMuted(connection) {
    const { CallSid } = connection.parameters
    this._handleUpdateCall(CallSid, {
      muted: connection.isMuted()
    })
  }

  _handleQueueCall(call) {
    const { CallSid } = call.connection.parameters
    this._handleUpdateCall(CallSid, {
      connection: window.Twilio.Device.connect({
        queue: `call-${call.call.id}`
      }),
      active: true,
      queued: false
    })
  }

  _handleReject(connection) {
    const { CallSid } = connection.parameters
    this._handleRemoveCall(CallSid)
  }

  _handleRemoveCall(CallSid) {
    this.setState({
      calls: this.state.calls.filter((call) => {
        return call.connection.parameters.CallSid !== CallSid || call.queued
      })
    })
  }

  _handleSwapCall(newcall) {
    const active = this.state.calls.find(call => {
      return call.active
    })
    this._handleEnqueueCall(active, () => {
      this.setState({
        calls: this.state.calls.map((call) => ({
          ...call,
          active: call.call.id === newcall.call.id
        }))
      })
      setTimeout(() => {
        this._handleQueueCall(newcall)
      }, 500)
    })
  }

  _handleToggle() {
    const { open } = this.state
    this.setState({
      open: !open
    })
  }

  _handleTransferCall(call, user_id) {
    const { params } = call
    this.context.network.request({
      endpoint: `/api/admin/crm/calls/${call.call.id}/transfer`,
      method: 'PATCH',
      body: {
        params,
        user_id
      }
    })
  }

  _handleUpdateCall(sid, params) {
    this.setState({
      calls: this.state.calls.map((call) => {
        if(call.connection.parameters.CallSid !== sid) return call
        return {
          ...call,
          ...params
        }
      })
    })
  }

}

const mapResources = (props, context) => ({
  programs: {
    endpoint: '/api/admin/crm/programs',
    filter: {
      phone_number_id: {
        $nnl: true
      }
    }
  },
  token: '/api/admin/phone_numbers/token'
})

const dependency = {
  name: 'Twilio',
  src: '/admin/js/twilio.min.js'
}

PhoneContainer = Container(mapResources)(PhoneContainer)

PhoneContainer = Dependency(dependency)(PhoneContainer)

export default PhoneContainer
