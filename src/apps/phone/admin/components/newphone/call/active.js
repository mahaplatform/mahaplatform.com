import Transfer from './transfer'
import PropTypes from 'prop-types'
import Keypad from '../keypad'
import Button from '../button'
import { Timer } from '@admin'
import Header from './header'
import React from 'react'
import SMS from '../sms'
import _ from 'lodash'

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

  _handleDigits = this._handleDigits.bind(this)
  _handleForward = this._handleForward.bind(this)
  _handleForwardCall = this._handleForwardCall.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleHold = this._handleHold.bind(this)
  _handleMute = this._handleMute.bind(this)
  _handleSMS = this._handleSMS.bind(this)
  _handleTransferCall = this._handleTransferCall.bind(this)
  _handleTransfer = this._handleTransfer.bind(this)

  render() {
    const buttons = this._getButtons()
    const rows = _.chunk(buttons, 3)
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
    const { call } = this.props
    if(call.client === 'cell') {
      return [
        { icon: 'random', label: 'transfer', handler: this._handleTransfer },
        { icon: 'arrow-right', label: 'forward', handler: this._handleForward },
        { icon: 'comments', label: 'sms', handler: this._handleSMS }
      ]
    }
    return [
      { icon: call.muted ? 'microphone-slash' : 'microphone', label: 'mute', handler: this._handleMute, depressed: call.muted },
      { icon: 'th', label: 'keypad', handler: this._handleMode.bind(this, 'keypad') },
      { icon: 'pause', label: 'hold', handler: this._handleHold, depressed: call.held },
      { icon: 'random', label: 'transfer', handler: this._handleTransfer },
      { icon: 'arrow-right', label: 'forward', handler: this._handleForward },
      { icon: 'comments', label: 'sms', handler: this._handleSMS }
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

  _getSMS() {
    const { call, onPop, onPush } = this.props
    return {
      phone_number: call.call.phone_number,
      program: call.call.program,
      onPop,
      onPush
    }
  }

  _getTransfer() {
    const { onPop } = this.props
    return {
      onPop,
      onChoose: this._handleTransferCall
    }
  }

  _handleDigits(number) {
    const { call } = this.props
    call.connection.sendDigits(number)
  }

  _handleForward() {
    const { call } = this.props
    const items = []
    if(call.client === 'cell') items.push({ label: 'Forward to my Maha phone', handler: this._handleForwardCall.bind(this, 'maha') })
    if(call.client === 'maha') items.push({ label: 'Forward to my cell phone', handler: this._handleForwardCall.bind(this, 'cell') })
    this.context.tasks.open({ items })
  }

  _handleForwardCall(client) {
    const { call } = this.props
    this.context.phone.forward(call, client)
  }

  _handleHangup() {
    const { call } = this.props
    this.context.phone.hangup(call)
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
    return this.props.onPush(SMS, this._getSMS.bind(this))
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
