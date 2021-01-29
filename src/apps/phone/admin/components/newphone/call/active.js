import PropTypes from 'prop-types'
import Transfer from './transfer'
import Keypad from '../keypad'
import Button from '../button'
import SMS from '../sms'
import { Timer } from '@admin'
import Header from './header'
import React from 'react'

class Active extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    network: PropTypes.object,
    phone: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    mode: 'functions'
  }

  _handleDevicePrompt = this._handleDevicePrompt.bind(this)
  _handleDevice = this._handleDevice.bind(this)
  _handleDigits = this._handleDigits.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleHold = this._handleHold.bind(this)
  _handleSMS = this._handleSMS.bind(this)
  _handleTransferCall = this._handleTransferCall.bind(this)
  _handleTransfer = this._handleTransfer.bind(this)
  _handleMute = this._handleMute.bind(this)

  render() {
    const buttons = this._getButtons()
    const rows = _.chunk(buttons, Math.ceil(buttons.length / 2))
    const { call } = this.props
    const { mode } = this.state
    return (
      <div className="maha-phone-call">
        <Header call={ call.call } />
        <div className="maha-phone-call-timer">
          <Timer from={ call.started_at } />
        </div>
        { call.client === 'cell' &&
          <div className="maha-phone-call-extra">
            This call is active on your cell phone
          </div>
        }
        <div className="maha-phone-call-body">
          { mode === 'functions' &&
            <div className="maha-phone-call-functions">
              { rows.map((row, i) => (
                <div className="maha-phone-actions" key={`actions_${i}`}>
                  { row.map((button, j) => (
                    <div className="maha-phone-action" key={`action_${i}_${j}`}>
                      <Button { ...button } />
                    </div>
                  ))}
                </div>
              )) }
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
    const { user } = this.context.admin
    const { call } = this.props
    return [
      { icon: 'th', label: 'keypad', handler: this._handleMode.bind(this, 'keypad'), disabled: call.client === 'cell' },
      { icon: 'random', label: 'transfer', handler: this._handleTransfer },
      { icon: 'pause', label: 'hold', handler: this._handleHold, depressed: call.held },
      { icon: call.muted ? 'microphone-slash' : 'microphone', label: 'mute', handler: this._handleMute, depressed: call.muted, disabled: call.client === 'cell' },
      { icon: 'arrow-right', label: 'forward', handler: this._handleDevicePrompt, disabled: user.cell_phone === null },
      { icon: 'comments', label: 'sms', handler: this._handleSMS }
    ]
  }

  _getFunctions() {
    return { icon: 'arrow-left', handler: this._handleMode.bind(this, 'functions') }
  }

  _getHangup() {
    const { call } = this.props
    return { icon: 'phone', type: 'hangup', handler: this._handleHangup, disabled: call.client === 'cell' }
  }

  _getKeyPad() {
    return {
      onChoose: this._handleDigits
    }
  }

  _getSMS() {
    const { call, onPop, onPush } = this.props
    return {
      phone_number: call.call.phone_number,
      program: call.call.program,
      onPop,
      onPush
    }
  }

  _handleDevicePrompt() {
    const { user } = this.context.admin
    if(!user.cell_phone) return
    const { call } = this.props
    const items = []
    if(call.client === 'maha') {
      items.push({ label: 'Forward to cell phone', handler: this._handleDevice.bind(this, 'cell') })
    }
    if(call.client === 'cell') {
      items.push({ label: 'Forward to Maha phone', handler: this._handleDevice.bind(this, 'maha') })
    }
    this.context.tasks.open({ items })
  }

  _handleDevice(client) {
    const { user } = this.context.admin
    const { call } = this.props
    const config = client === 'maha' ? {
      user,
      user_id: user.id
    } : {
      number: user.cell_phone
    }
    this.context.phone.forward(call, config)
  }

  _handleDigits(number) {
    const { call } = this.props
    call.connection.sendDigits(number)
  }

  _handleHangup() {
    const { call } = this.props
    call.connection.disconnect()
  }

  _handleHold() {
    const { phone } = this.context
    const { call } = this.props
    if(call.held) phone.unhold(call)
    if(!call.held) phone.hold(call)
  }

  _handleMode(mode) {
    this.setState({ mode })
  }

  _handleMute() {
    const { call } = this.props
    this.context.phone.mute(call)
  }

  _handleSMS() {
    const { call } = this.props
    return this.props.onPush(SMS, this._getSMS.bind(this))
  }

  _getTransfer() {
    const { onPop } = this.props
    return {
      onPop,
      onChoose: this._handleTransferCall
    }
  }

  _handleTransfer() {
    this.props.onPush(Transfer, this._getTransfer.bind(this))
  }

  _handleTransferCall(user) {
    const { phone } = this.context
    const { call } = this.props
    phone.transfer(call, {
      user,
      user_id: user.id
    })
  }

}

export default Active
