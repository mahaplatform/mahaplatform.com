import ContactAvatar from '../../../tokens/contact_avatar'
import SMSClient from '../../sms_client'
import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class SMS extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    channel: PropTypes.object,
    program: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleProfile = this._handleProfile.bind(this)

  render() {
    const { channel } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-sms-channel">
          <div className="maha-phone-sms-channel-header">
            <div className="maha-phone-sms-channel-token">
              <div className="maha-phone-sms-channel-token-avatar">
                <ContactAvatar { ...channel.contact } />
              </div>
              <div className="maha-phone-sms-channel-token-label">
                { channel.contact.display_name }<br />
                <span>{ channel.phone_number.formatted }</span>
              </div>
              <div className="maha-phone-sms-channel-token-icon" onClick={ this._handleProfile }>
                <i className="fa fa-question-circle-o" />
              </div>
            </div>
          </div>
          <div className="maha-phone-sms-channel-body">
            <SMSClient { ...this._getClient() } />
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getClient() {
    const { channel, program } = this.props
    return {
      program,
      channel
    }
  }

  _getPanel() {
    return {
      title: 'Conversation',
      color: 'violet',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleProfile() {
    const { channel } = this.props
    this.context.router.history.push(`/admin/crm/contacts/${channel.contact.id}`)
  }

}

export default SMS
