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

  _handleCall = this._handleCall.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleIncoming = this._handleIncoming.bind(this)
  _handleSelect = this._handleSelect.bind(this)
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
        select: this._handleSelect,
        toggle: this._handleToggle
      }
    }
  }

  _getParams(call) {
    const params = {}
    call.customParameters.forEach((value, key) => {
      params[key] = value
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

  _handleAddCall({ connection, call, params }) {
    const { calls } = this.state
    connection.on('accept', this._handleAccept.bind(this, connection))
    connection.on('reject', this._handleReject.bind(this, connection))
    connection.on('cancel', this._handleDisconnect.bind(this, connection))
    connection.on('disconnect', this._handleDisconnect.bind(this, connection))
    connection.on('error', this._handleError.bind(this, connection))
    connection.on('mute', this._handleMuted.bind(this, connection))
    this.setState({
      calls: [
        ...calls.map(call => ({
          ...call,
          active: false
        })),
        {
          active: true,
          connection,
          call,
          enqueue: this._handleEnqueue.bind(this),
          error: null,
          params,
          paused: false,
          status: 'ringing',
          started_at: moment(),
          muted: false
        }
      ],
      open: true
    })
  }

  _handleCall({ contact, program, to }) {
    const { admin } = this.context
    this._handleAddCall({
      connection: window.Twilio.Device.connect({
        From: program.phone_number.number,
        To: to,
        client: `user-${admin.user.id}`,
        user_id: admin.user.id
      }),
      call: {
        program,
        contact,
        from: program.phone_number.number,
        to
      },
      params: ''
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

  _handleEnqueue(call) {
    const { CallSid } = call.connection.parameters
    this._handleUpdateCall(CallSid, {
      paused: true
    })
    this.context.network.request({
      endpoint: `/api/admin/crm/calls/${call.call.id}/enqueue`,
      method: 'PATCH'
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
      allowIncomingWhileBusy: true
    })
    window.Twilio.Device.on('incoming', this._handleIncoming)
  }

  _handleMuted(connection) {
    const { CallSid } = connection.parameters
    this.setState({
      calls: this.state.calls.map((call) => {
        if(call.connection.parameters.CallSid !== CallSid) return call
        return {
          ...call,
          muted: connection.isMuted()
        }
      })
    })
  }

  _handleReject(connection) {
    const { CallSid } = connection.parameters
    this._handleRemoveCall(CallSid)
  }

  _handleRemoveCall(CallSid) {
    this.setState({
      calls: this.state.calls.filter((call) => {
        return call.connection.parameters.CallSid !== CallSid || call.paused
      })
    })
  }

  _handleSelect(call) {
    const { CallSid } = call.connection.parameters
    this.setState({
      calls: this.state.calls.map((call) => {
        return {
          ...call,
          active: call.connection.parameters.CallSid !== CallSid
        }
      })
    })
  }

  _handleToggle() {
    const { open } = this.state
    this.setState({
      open: !open
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
