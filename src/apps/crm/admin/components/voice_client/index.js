import ContactAvatar from '../../tokens/contact_avatar'
import { Container, Loader, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import Timer from './timer'
import React from 'react'

class VoiceClient extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    cancelIcon: PropTypes.string,
    cancelText: PropTypes.string,
    contact: PropTypes.object,
    doneText: PropTypes.string,
    phone_number: PropTypes.object,
    program: PropTypes.object,
    token: PropTypes.string,
    title: PropTypes.string,
    onCancel: PropTypes.func,
    onDone: PropTypes.func
  }

  static defaultProps = {
    cancelText: 'Cancel',
    title: 'Call Contact'
  }

  state = {
    error: null,
    loaded: false,
    ready: false,
    status: 'ready'
  }

  _handleCall = this._handleCall.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleCheck = this._handleCheck.bind(this)
  _handleError = this._handleError.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleReady = this._handleReady.bind(this)

  render() {
    const { contact, phone_number } = this.props
    const { error, loaded, ready, status } = this.state
    const loading = !loaded || !ready
    return (
      <ModalPanel { ...this._getPanel()}>
        { loading && <Loader /> }
        { !loading &&
          <div className="crm-call">
            <div className="crm-call-panel">
              <ContactAvatar { ...contact } />
              <h2>{ contact.display_name }</h2>
              <p>{ phone_number.number }</p>
              <div { ...this._getButton() }>
                <i className="fa fa-phone" />
              </div>
              <div className="crm-call-timer">
                { status === 'active' &&
                  <Timer />
                }
                { error &&
                  <span className="alert">
                    { error }
                  </span>
                }
              </div>
            </div>
          </div>
        }
      </ModalPanel>
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

  _getButton() {
    const { status } = this.state
    return {
      className: this._getButtonClass(),
      onClick: status === 'ready' ? this._handleCall : this._handleHangup
    }
  }

  _getButtonClass() {
    const { status } = this.state
    const classes = ['crm-call-button']
    if(status === 'ready') classes.push('call')
    if(status === 'active') classes.push('hangup')
    return classes.join(' ')
  }

  _getCheckbox() {
    const { record } = this.state
    return {
      defaultValue: record,
      prompt: 'Record call',
      onChange: this._handleRecord
    }
  }

  _getPanel() {
    const { doneText, title, onDone } = this.props
    return {
      title,
      leftItems: this._getCancel(),
      rightItems: doneText ? [
        { label: doneText, handler: onDone }
      ] : null
    }
  }

  _getCancel() {
    const { cancelIcon, cancelText, onCancel } = this.props
    const handler = onCancel || this._handleCancel
    if(cancelIcon) return [{ icon: cancelIcon, handler }]
    if(cancelText) return [{ label: cancelText, handler }]
    return null
  }

  _getRadioGroup() {
    const { strategy } = this.state
    return {
      defaultValue: strategy,
      options: [
        { value: 'browser', text: 'Call using my browser' },
        { value: 'phone', text: 'Call me and then connect to contact' }
      ],
      onChange: this._handleStrategy
    }
  }

  _handleCall() {
    const { program, phone_number } = this.props
    const { user } = this.context.admin
    this.setState({
      error: null
    })
    window.Twilio.Device.connect({
      From: program.phone_number.number,
      To: phone_number.number,
      client: 'maha',
      user_id: user.id
    })
  }

  _handleCancel() {
    this.context.modal.close()
  }

  _handleCheck() {
    const loaded = typeof window !== 'undefined' && typeof window.Twilio !== 'undefined'
    this.setState({ loaded })
    if(!loaded) setTimeout(this._handleCheck, 1000)
  }

  _handleError(error) {
    this.setState({
      error: error.message
    })
  }

  _handleHangup() {
    window.Twilio.Device.disconnectAll()
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

  _handleInit() {
    const { token } = this.props
    window.Twilio.Device.setup(token)
    const status = window.Twilio.Device.status()
    if(status === 'ready') return this._handleReady()
    window.Twilio.Device.ready(this._handleReady)
    window.Twilio.Device.connect(this._handleStatus.bind(this, 'active'))
    window.Twilio.Device.disconnect(this._handleStatus.bind(this, 'ready'))
    window.Twilio.Device.error(this._handleError)
  }

  _handleReady() {
    this.setState({
      ready: true
    })
  }

  _handleStrategy(strategy) {
    this.setState({ strategy })
  }

  _handleStatus(status) {
    this.setState({ status })
  }

}

const mapResources = (props, context) => ({
  token: `/api/admin/phone_numbers/${props.program.phone_number.id}/token`
})

export default Container(mapResources)(VoiceClient)
