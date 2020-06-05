import Phone from '../../components/phone'
import { Container, Dependency } from 'maha-admin'
import PropTypes from 'prop-types'
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
    open: false,
    ready: false
  }

  _handleCall = this._handleCall.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleIncoming = this._handleIncoming.bind(this)
  _handleReady = this._handleReady.bind(this)
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
    this.setState({
      calls: this.state.calls.map((call) => {
        if(call.connection.parameters.CallSid !== CallSid) return call
        return {
          ...call,
          status: 'active'
        }
      })
    })
  }

  _handleCall({ from, to }) {
    const { admin } = this.context
    window.Twilio.Device.connect({
      From: from,
      To: to,
      client: `user-${admin.user.id}`,
      user_id: admin.user.id
    })
  }

  _handleClose() {
    this.setState({
      open: false
    })
  }

  _handleDisconnect(connection) {
    const { CallSid } = connection.parameters
    this.setState({
      calls: this.state.calls.filter((call) => {
        return call.connection.parameters.CallSid !== CallSid
      })
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
    const { calls } = this.state
    const params = this._getParams(connection)
    connection.on('accept', this._handleAccept.bind(this, connection))
    connection.on('reject', this._handleReject.bind(this, connection))
    connection.on('cancel', this._handleDisconnect.bind(this, connection))
    connection.on('disconnect', this._handleDisconnect.bind(this, connection))
    connection.on('error', this._handleError.bind(this, connection))
    connection.on('mute', this._handleMuted.bind(this, connection))
    this.context.network.request({
      endpoint: `/api/admin/crm/contacts/${params.contact_id}/calls/${params.id}`,
      method: 'GET',
      onSuccess: ({ data }) => {
        this.setState({
          calls: [
            ...calls,
            {
              connection,
              call: data,
              error: null,
              params,
              status: 'ringing',
              muted: false
            }
          ],
          open: true
        })
      }
    })
  }

  _handleInit() {
    const { token } = this.props
    window.Twilio.Device.setup(token, {
      allowIncomingWhileBusy: true
    })
    const status = window.Twilio.Device.status()
    if(status === 'ready') return this._handleReady()
    window.Twilio.Device.on('ready', this._handleReady)
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

  _handleReady() {
    this.setState({
      ready: true
    })
  }

  _handleReject(connection) {
    const { CallSid } = connection.parameters
    this.setState({
      calls: this.state.calls.filter((call) => {
        return call.connection.parameters.CallSid !== CallSid
      })
    })
  }

  _handleToggle() {
    const { open } = this.state
    this.setState({
      open: !open
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
