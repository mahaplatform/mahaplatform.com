import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import Phone from './phone'
import React from 'react'

class PhoneContainer extends React.Component {

  static childContextTypes = {
    phone: PropTypes.object
  }

  static contextTypes = {
    admin: PropTypes.object
  }

  static propTypes = {
    children: PropTypes.any,
    programs: PropTypes.any,
    token: PropTypes.any
  }

  state = {
    incoming: null,
    loaded: false,
    open: false,
    ready: false,
    status: 'ready'
  }

  _handleCall = this._handleCall.bind(this)
  _handleCheck = this._handleCheck.bind(this)
  _handleClose = this._handleClose.bind(this)
  _handleConnect = this._handleConnect.bind(this)
  _handleDisconnect = this._handleDisconnect.bind(this)
  _handleError = this._handleError.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleIncoming = this._handleIncoming.bind(this)
  _handlePickup = this._handlePickup.bind(this)
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
    this._handleLoad()
  }

  componentDidUpdate(prevProps, prevState) {
    const { loaded } = this.state
    if(loaded !== prevState.loaded && loaded) {
      this._handleInit()
    }
  }

  getChildContext() {
    return {
      phone: {
        call: this._handleCall,
        toggle: this._handleToggle,
        pickup: this._handlePickup,
        hangup: this._handleHangup
      }
    }
  }

  _getPhone() {
    const { programs } = this.props
    const { status } = this.state
    return {
      programs,
      status,
      onClose: this._handleClose
    }
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

  _handleCheck() {
    const loaded = typeof window !== 'undefined' && typeof window.Twilio !== 'undefined'
    this.setState({ loaded })
    if(!loaded) setTimeout(this._handleCheck, 1000)
  }

  _handleClose() {
    this.setState({
      open: false
    })
  }

  _handleConnect() {
    this.setState({
      status: 'active'
    })
  }

  _handleError(error) {
    this.setState({
      error: error.message
    })
  }

  _handleHangup() {
    window.Twilio.Device.disconnectAll()
  }

  _handleIncoming(incoming) {
    this.setState({
      incoming,
      status: 'ringing'
    })
  }

  _handleInit() {
    const { token } = this.props
    window.Twilio.Device.setup(token)
    const status = window.Twilio.Device.status()
    if(status === 'ready') return this._handleReady()
    window.Twilio.Device.on('ready', this._handleReady)
    window.Twilio.Device.on('connect', this._handleConnect)
    window.Twilio.Device.on('disconnect', this._handleDisconnect)
    window.Twilio.Device.on('error', this._handleError)
    window.Twilio.Device.on('incoming', this._handleIncoming)
  }

  _handleDisconnect() {
    this.setState({
      incoming: null,
      status: 'ready'
    })
  }

  _handleLoad() {
    const loaded = typeof window !== 'undefined' && typeof window.Twilio !== 'undefined'
    if(loaded) return this.setState({ loaded })
    const script = document.createElement('script')
    script.async = true
    script.src = '/admin/js/twilio.min.js'
    document.body.appendChild(script)
    setTimeout(this._handleCheck, 1000)
  }

  _handlePickup() {
    this.state.incoming.accept()
  }

  _handleReady() {
    this.setState({
      ready: true
    })
  }

  _handleStatus(status) {
    this.setState({ status })
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

export default Container(mapResources)(PhoneContainer)
