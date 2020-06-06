import PropTypes from 'prop-types'
import Timer from '../../timer'
import Header from './header'
import React from 'react'

class Call extends React.Component {

  static contextTypes = {
    network: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object
  }

  _handleEnqueue = this._handleEnqueue.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleKeypad = this._handleKeypad.bind(this)
  _handleMute = this._handleMute.bind(this)
  _handleQueue = this._handleQueue.bind(this)

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
                Info
              </div>
            </div>
            { call.paused ?
              <div className="maha-phone-call-action">
                <div className="maha-phone-call-button depressed" onClick={ this._handleQueue }>
                  <i className="fa fa-play" />
                </div>
                <div className="maha-phone-call-label">
                  Unhold
                </div>
              </div> :
              <div className="maha-phone-call-action">
                <div className="maha-phone-call-button" onClick={ this._handleEnqueue }>
                  <i className="fa fa-pause" />
                </div>
                <div className="maha-phone-call-label">
                  Hold
                </div>
              </div>
            }
            <div className="maha-phone-call-action">
              <div className="maha-phone-call-button" onClick={ this._handleKeypad }>
                <i className="fa fa-th" />
              </div>
              <div className="maha-phone-call-label">
                Keypad
              </div>
            </div>
            { call.muted ?
              <div className="maha-phone-call-action">
                <div className="maha-phone-call-button depressed" onClick={ this._handleMute }>
                  <i className="fa fa-microphone-slash" />
                </div>
                <div className="maha-phone-call-label">
                 Unmute
                </div>
              </div> :
              <div className="maha-phone-call-action">
                <div className="maha-phone-call-button" onClick={ this._handleMute }>
                  <i className="fa fa-microphone" />
                </div>
                <div className="maha-phone-call-label">
                  Mute
                </div>
              </div>
            }
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
      title: 'Incoming Call',
      color: 'violet'
    }
  }

  _handleEnqueue() {
    const { call } = this.props
    this.props.call.enqueue(call)
  }

  _handleHangup() {
    const { call } = this.props
    const { code } = call.params
    this.context.network.request({
      endpoint: `/api/admin/crm/calls/${call.call.id}/hangup`,
      method: 'PATCH',
      body: { code }
    })
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
    call.connection.mute()
  }

  _handleQueue() {}

}

export default Call
