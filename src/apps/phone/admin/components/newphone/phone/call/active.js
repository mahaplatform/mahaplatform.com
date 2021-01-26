import PropTypes from 'prop-types'
import Timer from '../../../timer'
import Keypad from '../keypad'
import Button from '../button'
import React from 'react'

class Call extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    phone: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object,
    program: PropTypes.object
  }

  state = {
    mode: 'functions'
  }

  _handleDigits = this._handleDigits.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleMute = this._handleMute.bind(this)

  render() {
    const buttons = this._getButtons()
    const { call } = this.props
    const { mode } = this.state
    return (
      <div className="maha-phone-call">
        <div className="maha-phone-call-timer">
          <Timer from={ call.started_at } />
        </div>
        <div className="maha-phone-call-body">
          { mode === 'functions' &&
            <div className="maha-phone-call-functions">
              <div className="maha-phone-actions">
                { buttons.map((button, i) => (
                  <div className="maha-phone-action" key={`action_${i}`}>
                    <Button { ...button } />
                  </div>
                ))}
              </div>
            </div>
          }
          { mode === 'keypad' &&
            <Keypad { ...this._getKeyPad() } />
          }
        </div>
        { mode === 'functions' &&
          <div className="maha-phone-actions">
            <div className="maha-phone-action">
              <Button { ...this._getHangup() } />
            </div>
          </div>
        }
        { mode === 'keypad' &&
          <div className="maha-phone-actions">
            <div className="maha-phone-action">
              <Button { ...this._getFunctions() } />
            </div>
          </div>
        }
      </div>
    )
  }

  _getButtons() {
    const { call } = this.props
    return [
      { icon: 'th', label: 'keypad', handler: this._handleMode.bind(this, 'keypad') },
      { icon: call.muted ? 'microphone-slash' : 'microphone', label: 'mute', handler: this._handleMute, depressed: call.muted },
//      { icon: 'comments', label: 'sms', handler: this._handleSMS }
    ]
  }

  _getFunctions() {
    return { icon: 'arrow-left', handler: this._handleMode.bind(this, 'functions') }
  }

  _getHangup() {
    return { icon: 'phone', type: 'hangup', handler: this._handleHangup }
  }

  _getKeyPad() {
    return {
      onChoose: this._handleDigits
    }
  }

  _handleDigits(number) {
    const { call } = this.props
    call.connection.sendDigits(number)
  }

  _handleHangup() {
    const { call } = this.props
    call.connection.disconnect()
  }

  _handleMode(mode) {
    this.setState({ mode })
  }

  _handleMute() {
    const { call } = this.props
    call.connection.mute(!call.connection.isMuted())
  }

}

export default Call
