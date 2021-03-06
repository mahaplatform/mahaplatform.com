import { Container, Dependencies, Loader, ModalPanel, Timer } from '@admin'
import ContactAvatar from '@apps/crm/admin/tokens/contact_avatar'
import PropTypes from 'prop-types'
import React from 'react'

class VoiceClient extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    modal: PropTypes.object
  }

  static propTypes = {
    cancelIcon: PropTypes.string,
    cancelText: PropTypes.string,
    channel: PropTypes.object,
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
    ready: false,
    status: 'ready'
  }

  _handleCall = this._handleCall.bind(this)
  _handleCancel = this._handleCancel.bind(this)
  _handleError = this._handleError.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleReady = this._handleReady.bind(this)

  render() {
    const { contact, channel, phone_number } = this.props
    const { error, ready, status } = this.state
    return (
      <ModalPanel { ...this._getPanel()}>
        { !ready && <Loader /> }
        { ready &&
          <div className="crm-call">
            { !channel.has_consented &&
              <div className="crm-channel-alert">
                This contact has not given consent to send marketing related
                messages on this channel
              </div>
            }
            <div className="crm-call-panel">
              <ContactAvatar { ...contact } />
              <h2>{ contact.display_name }</h2>
              <p>{ phone_number.number }</p>
              <div { ...this._getButton() }>
                <i className="fa fa-phone" />
              </div>
              <div className="crm-call-footer">
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
    this._handleInit()
  }

  componentDidUpdate(prevProps, prevState) {
    const { ready } = this.state
    if(ready !== prevState.ready && ready) {
      this._handleCall()
    }
  }

  componentWillUnmount() {
    this._handleHangup()
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

  _handleError(error) {
    this.setState({
      error: error.message
    })
  }

  _handleHangup() {
    window.Twilio.Device.disconnectAll()
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

const dependencies = {
  scripts: [
    { url: `${process.env.ASSET_CDN_HOST}/js/twilio.min.js`, check: 'Twilio.Device' }
  ]
}

const mapResources = (props, context) => ({
  channel: `/api/admin/crm/programs/${props.program.id}/channels/voice/${props.phone_number.id}`,
  token: '/api/admin/phone_numbers/token'
})

VoiceClient = Dependencies(dependencies)(VoiceClient)

export default Container(mapResources)(VoiceClient)
