import PropTypes from 'prop-types'
import Transfer from './transfer'
import Timer from '../../timer'
import Header from './header'
import SMS from '../sms/sms'
import React from 'react'

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

  _handleEnqueue = this._handleEnqueue.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleKeypad = this._handleKeypad.bind(this)
  _handleMute = this._handleMute.bind(this)
  _handleQueue = this._handleQueue.bind(this)
  _handleSMS = this._handleSMS.bind(this)
  _handleTransfer = this._handleTransfer.bind(this)
  _handleTransferCall = this._handleTransferCall.bind(this)

  render() {
    const { call } = this.props
    return (
      <div className="maha-phone-call">
        <Header call={ call } />
        <div className="maha-phone-call-timer">
          <Timer from={ call.started_at } />
        </div>
        <div className="maha-phone-call-body">
          <div className="maha-phone-call-actions">
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button" onClick={ this._handleInfo }>
                <i className="fa fa-info" />
              </div>
              <div className="maha-phone-call-label">
                contact info
              </div>
            </div>
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button" onClick={ this._handleKeypad }>
                <i className="fa fa-th" />
              </div>
              <div className="maha-phone-call-label">
                keypad
              </div>
            </div>
            { call.muted ?
              <div className="maha-phone-call-action">
                <div className="maha-phone-call-button depressed" onClick={ this._handleMute }>
                  <i className="fa fa-microphone-slash" />
                </div>
                <div className="maha-phone-call-label">
                 unmute
                </div>
              </div> :
              <div className="maha-phone-call-action">
                <div className="maha-phone-call-button" onClick={ this._handleMute }>
                  <i className="fa fa-microphone" />
                </div>
                <div className="maha-phone-call-label">
                  mute
                </div>
              </div>
            }
            { call.queued ?
              <div className="maha-phone-call-action">
                <div className="maha-phone-call-button depressed" onClick={ this._handleQueue }>
                  <i className="fa fa-pause" />
                </div>
                <div className="maha-phone-call-label">
                  hold
                </div>
              </div> :
              <div className="maha-phone-call-action">
                <div className="maha-phone-call-button" onClick={ this._handleEnqueue }>
                  <i className="fa fa-pause" />
                </div>
                <div className="maha-phone-call-label">
                  hold
                </div>
              </div>
            }
          </div>
          <div className="maha-phone-call-actions">
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button" onClick={ this._handleKeypad }>
                <i className="fa fa-plus" />
              </div>
              <div className="maha-phone-call-label">
                add call
              </div>
            </div>
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button" onClick={ this._handleKeypad }>
                <i className="fa fa-users" />
              </div>
              <div className="maha-phone-call-label">
                conference
              </div>
            </div>
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button" onClick={ this._handleTransfer }>
                <i className="fa fa-random" />
              </div>
              <div className="maha-phone-call-label">
                transfer
              </div>
            </div>
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button" onClick={ this._handleSMS }>
                <i className="fa fa-comment" />
              </div>
              <div className="maha-phone-call-label">
                sms
              </div>
            </div>
          </div>
          <div className="maha-phone-call-actions">
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button hangup" onClick={ this._handleHangup }>
                <i className="fa fa-phone" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  _getHeader() {
    const { call } = this.props.call
    return {
      call
    }
  }

  _getPanel() {
    return {
      title: 'Incoming Call'
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

  _handleEnqueue() {
    const { call } = this.props
    this.props.call.enqueue(call)
  }

  _handleHangup() {
    const { call } = this.props
    this.props.call.hangup(call)
  }

  _handleInfo() {
    const { call } = this.props
    const { contact } = call.call
    this.context.router.history.push(`/admin/crm/contacts/${contact.id}`)
  }

  _handleKeypad() {
    console.log('keypad')
  }

  _handleMute() {
    const { call } = this.props
    call.connection.mute(!call.muted)
  }

  _handleQueue() {
    const { call } = this.props
    this.props.call.queue(call)
  }

  _handleSMS() {
    this.props.onPush(SMS, this._getSMS())
  }

  _handleTransfer() {
    this.props.onPush(Transfer, this._getTransfer())
  }

  _handleTransferCall(user) {
    console.log(user)
    const { call } = this.props
    this.props.call.transfer(call, user.id)
  }

}

export default Call
