import PropTypes from 'prop-types'
import Transfer from './transfer'
import Timer from '../../timer'
import Button from '../button'
import Keypad from '../keypad'
import Header from './header'
import SMS from '../sms/sms'
import React from 'react'
import _ from 'lodash'

class Call extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  state = {
    mode: 'functions'
  }

  _handleAddCall = this._handleAddCall.bind(this)
  _handleDigits = this._handleDigits.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleHold = this._handleHold.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleMute = this._handleMute.bind(this)
  _handleSMS = this._handleSMS.bind(this)
  _handleTransfer = this._handleTransfer.bind(this)
  _handleTransferCall = this._handleTransferCall.bind(this)

  render() {
    const { mode } = this.state
    const { call } = this.props
    const buttons = this._getButtons()
    const rows = _.chunk(buttons, 3)
    return (
      <div className="maha-phone-call">
        <Header call={ call } />
        <div className="maha-phone-call-timer">
          <Timer from={ call.started_at } />
          { call.status }
        </div>
        <div className="maha-phone-call-body">
          { mode === 'functions' ?
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
            </div> :
            <Keypad { ...this._getKeyPad() } />
          }
        </div>
        { mode === 'functions' ?
          <div className="maha-phone-actions">
            <div className="maha-phone-action">
              <Button { ...this._getHangup() } />
            </div>
          </div> :
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
      { icon: 'pause', label: 'hold', handler: this._handleHold, depressed: call.queued },
      { icon: 'plus', label: 'add call', handler: this._handleAddCall },
      { icon: 'random', label: 'transfer', handler: this._handleTransfer },
      { icon: 'comment', label: 'sms', handler: this._handleSMS }
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

  _getPanel() {
    const { call } = this.props
    const { direction } = call.call
    return {
      title: direction === 'inbound' ? 'Inbound Call' : 'Outbound Call'
    }
  }

  _getSMS() {
    const { call, onPop, onPush } = this.props
    const { contact, program, phone_number} = call.call
    return  {
      program,
      channel: {
        contact,
        phone_number
      },
      onPop,
      onPush
    }
  }

  _getTransfer() {
    const { onPop } = this.props
    return {
      onChoose: this._handleTransferCall,
      onPop
    }
  }

  _handleAddCall() {}

  _handleDigits(number) {
    const { call } = this.props
    call.connection.sendDigits(number)
  }

  _handleHangup() {
    const { call } = this.props
    this.props.call.hangup(call)
  }

  _handleHold() {
    const { call } = this.props
    if(call.queued) return this.props.call.queue(call)
    this.props.call.enqueue(call)
  }

  _handleInfo() {
    const { call } = this.props
    const { contact } = call.call
    this.context.router.history.push(`/admin/crm/contacts/${contact.id}`)
  }

  _handleMode(mode) {
    this.setState({ mode })
  }

  _handleMute() {
    const { call } = this.props
    call.connection.mute(!call.muted)
  }

  _handleSMS() {
    this.props.onPush(SMS, this._getSMS())
  }

  _handleTransfer() {
    this.props.onPush(Transfer, this._getTransfer())
  }

  _handleTransferCall(user) {
    const { call } = this.props
    this.props.call.transfer(call, user.id)
  }

}

export default Call
