import ContactAvatar from '@apps/crm/admin/tokens/contact_avatar'
import SMSClient from '../../sms_client'
import { Container, ModalPanel } from '@admin'
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
            <div className="maha-phone-sms-channel-token" onClick={ this._handleProfile }>
              <div className="maha-phone-sms-channel-token-avatar">
                <ContactAvatar { ...channel.contact } />
              </div>
              <div className="maha-phone-sms-channel-token-label">
                { channel.contact.display_name }<br />
                <span>{ channel.phone_number.formatted }</span>
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
      phone_number: channel.phone_number,
      program
    }
  }

  _getPanel() {
    return {
      title: 'Conversation',
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
    this.context.router.history.push(`/crm/contacts/${channel.contact.id}`)
  }

}

const mapResources = (props, context) => ({
  channel: `/api/admin/crm/programs/${props.program.id}/channels/sms/${props.phone_id}`
})

export default Container(mapResources)(SMS)
