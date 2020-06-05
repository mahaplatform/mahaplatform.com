import { Container, Dependency } from 'maha-admin'
import Phone from '../../components/phone'
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
    call: null,
    open: false
  }

  _handleAccept = this._handleAccept.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleDisconnect = this._handleDisconnect.bind(this)
  _handleError = this._handleError.bind(this)
  _handleIncoming = this._handleIncoming.bind(this)
  _handleMuted = this._handleMuted.bind(this)
  _handleReject = this._handleReject.bind(this)
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
    const { call } = this.state
    const { programs } = this.props
    return {
      call,
      programs,
      onClose: this._handleClose
    }
  }

  _handleAccept() {
    const { call } = this.state
    this.setState({
      call: {
        ...call,
        status: 'active'
      }
    })
  }

  _handleCall({ contact, program, to }) {
    const { admin } = this.context
    const connection = window.Twilio.Device.connect({
      From: program.phone_number.number,
      To: to,
      client: `user-${admin.user.id}`,
      user_id: admin.user.id
    })
    this.setState({
      call: {
        connection,
        call: {
          program,
          contact,
          from: program.phone_number.number,
          to
        },
        error: null,
        params: '',
        status: 'ringing',
        muted: false
      },
      open: true
    })
    connection.on('accept', this._handleAccept)
    connection.on('reject', this._handleReject)
    connection.on('cancel', this._handleDisconnect)
    connection.on('disconnect', this._handleDisconnect)
    connection.on('error', this._handleError)
    connection.on('mute', this._handleMuted)
  }

  _handleClose() {
    this.setState({
      open: false
    })
  }

  _handleDisconnect() {
    this.setState({
      call: null
    })
  }

  _handleError(error) {
    const { call } = this.state
    this.setState({
      call: {
        ...call,
        error
      }
    })
  }

  _handleIncoming(connection) {
    const params = this._getParams(connection)
    connection.on('accept', this._handleAccept)
    connection.on('reject', this._handleReject)
    connection.on('cancel', this._handleDisconnect)
    connection.on('disconnect', this._handleDisconnect)
    connection.on('error', this._handleError)
    connection.on('mute', this._handleMuted)
    this.context.network.request({
      endpoint: `/api/admin/crm/contacts/${params.contact_id}/calls/${params.id}`,
      method: 'GET',
      onSuccess: ({ data }) => {
        this.setState({
          call: {
            connection,
            call: data,
            error: null,
            params,
            status: 'ringing',
            muted: false
          },
          open: true
        })
      }
    })
  }

  _handleInit() {
    const { token } = this.props
    window.Twilio.Device.setup(token)
    window.Twilio.Device.on('incoming', this._handleIncoming)
  }

  _handleMuted() {
    const { call } = this.state
    this.setState({
      call: {
        ...call,
        muted: call.connection.isMuted()
      }
    })
  }

  _handleReady() {
    this.setState({
      ready: true
    })
  }

  _handleReject(connection) {
    this.setState({
      call: null
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
