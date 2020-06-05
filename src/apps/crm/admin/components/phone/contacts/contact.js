import ContactAvatar from '../../../tokens/contact_avatar'
import { Container, ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'
import SMS from '../sms/sms'

class Contact extends React.Component {

  static contextTypes = {
    phone: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    program: PropTypes.object,
    channel: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleSMS = this._handleSMS.bind(this)

  render() {
    const { contact } = this.props
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-contact">
          <div className="maha-phone-contact-header">
            <ContactAvatar { ...contact } />
            <h2>{ contact.display_name }</h2>
            <p>{ contact.email }</p>
            <p>{ contact.phone }</p>
            <div className="maha-phone-contact-actions">
              <div className="maha-phone-contact-action" onClick={ this._handleSMS }>
                <div className="maha-phone-contact-button">
                  <i className="fa fa-comment" />
                </div>
              </div>
              <div className="maha-phone-contact-action" onClick={ this._handleCall }>
                <div className="maha-phone-contact-button">
                  <i className="fa fa-phone" />
                </div>
              </div>
              <div className="maha-phone-contact-action" onClick={ this._handleInfo }>
                <div className="maha-phone-contact-button">
                  <i className="fa fa-info" />
                </div>
              </div>
            </div>
          </div>
          <div className="maha-phone-contact-title">
            Communication History
          </div>
          <div className="maha-phone-contact-body">
            <div className="maha-phone-contact-activity call">
              <div className="maha-phone-contact-activity-icon">
                <i className="fa fa-phone" />
              </div>
              <div className="maha-phone-contact-activity-label">
                <span>Yesterday</span><br />
                Incoming Call from Gregory Kops
              </div>
            </div>
            <div className="maha-phone-contact-activity sms">
              <div className="maha-phone-contact-activity-icon">
                <i className="fa fa-comment" />
              </div>
              <div className="maha-phone-contact-activity-label">
                <span>Wednesday</span><br />
                Outgoing SMS Campaign
              </div>
            </div>
            <div className="maha-phone-contact-activity email">
              <div className="maha-phone-contact-activity-icon">
                <i className="fa fa-envelope" />
              </div>
              <div className="maha-phone-contact-activity-label">
                <span>Monday</span><br />
                Email Campaign
              </div>
            </div>
            <div className="maha-phone-contact-activity call">
              <div className="maha-phone-contact-activity-icon">
                <i className="fa fa-phone" />
              </div>
              <div className="maha-phone-contact-activity-label">
                <span>Yesterday</span><br />
                Incoming Call from Gregory Kops
              </div>
            </div>
            <div className="maha-phone-contact-activity sms">
              <div className="maha-phone-contact-activity-icon">
                <i className="fa fa-comment" />
              </div>
              <div className="maha-phone-contact-activity-label">
                <span>Wednesday</span><br />
                Outgoing SMS Campaign
              </div>
            </div>
            <div className="maha-phone-contact-activity email">
              <div className="maha-phone-contact-activity-icon">
                <i className="fa fa-envelope" />
              </div>
              <div className="maha-phone-contact-activity-label">
                <span>Monday</span><br />
                Email Campaign
              </div>
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getPanel() {
    return {
      title: 'Contact',
      color: 'violet',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getSMS() {
    const { contact, channel, program, onPop, onPush } = this.props
    return {
      channel: {
        ...channel,
        contact
      },
      program,
      onPop,
      onPush
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleCall() {
    const { contact, program } = this.props
    this.context.phone.call({
      program,
      contact,
      to: contact.phone
    })
  }

  _handleInfo() {
    const { contact } = this.props
    this.context.router.history.push(`/admin/crm/contacts/${contact.id}`)
  }

  _handleSMS() {
    this.props.onPush(SMS, this._getSMS())
  }

}


const mapResources = (props, context) => ({
  channel: `/api/admin/crm/programs/${props.program.id}/channels/sms/${props.contact.phone_id}`
})

export default Container(mapResources)(Contact)
