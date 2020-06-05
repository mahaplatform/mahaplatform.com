import ContactAvatar from '../../../tokens/contact_avatar'
import { ModalPanel } from 'maha-admin'
import Program from '../programs/program'
import PropTypes from 'prop-types'
import Timer from './timer'
import React from 'react'

class Call extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    call: PropTypes.object
  }

  _handleAccept = this._handleAccept.bind(this)
  _handleHangup = this._handleHangup.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleMute = this._handleMute.bind(this)
  _handleReject = this._handleReject.bind(this)

  render() {
    const { call } = this.props
    const { contact, from, program } = call.call
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-call">
          <div className="maha-phone-call-header">
            <div className="maha-phone-call-program">
              <Program program={ program } />
            </div>
            <div className="maha-phone-call-contact">
              <ContactAvatar { ...contact } />
              <h2>{ contact.display_name }</h2>
              <p>{ from.formatted }</p>
            </div>
          </div>
          { call.status === 'ringing' &&
            <div className="maha-phone-call-body">
              <div className="maha-phone-call-actions">
                <div className="maha-phone-call-action">
                  <div className="maha-phone-call-button hangup" onClick={ this._handleReject }>
                    <i className="fa fa-phone" />
                  </div>
                </div>
                <div className="maha-phone-call-action">
                  <div className="maha-phone-call-button pickup" onClick={ this._handleAccept }>
                    <i className="fa fa-phone" />
                  </div>
                </div>
              </div>
            </div>
          }
          { call.status === 'active' &&
            <div className="maha-phone-call-body">
              <div className="maha-phone-call-timer">
                <Timer />
              </div>
              <div className="maha-phone-call-actions">
                <div className="maha-phone-call-action">
                  <div className="maha-phone-call-button" onClick={ this._handleInfo }>
                    <i className="fa fa-info" />
                  </div>
                </div>
                <div className="maha-phone-call-action">
                  { call.muted ?
                    <div className="maha-phone-call-button depressed" onClick={ this._handleMute }>
                      <i className="fa fa-microphone-slash" />
                    </div> :
                    <div className="maha-phone-call-button" onClick={ this._handleMute }>
                      <i className="fa fa-microphone" />
                    </div>
                  }
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
          }
        </div>
      </ModalPanel>
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
      title: 'Call',
      color: 'violet'
    }
  }

  _handleAccept() {
    const { call } = this.props
    call.connection.accept()
  }

  _handleHangup() {
    const { call } = this.props
    call.connection.disconnect()
  }

  _handleInfo() {
    const { call } = this.props
    const { contact } = call.call
    this.context.router.history.push(`/admin/crm/contacts/${contact.id}`)
  }

  _handleMute() {
    const { call } = this.props
    call.connection.mute()
  }

  _handleReject() {
    const { call } = this.props
    call.connection.reject()
  }

}

export default Call
