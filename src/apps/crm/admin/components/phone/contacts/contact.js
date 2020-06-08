import ContactAvatar from '../../../tokens/contact_avatar'
import { Button, Container, List, ModalPanel } from 'maha-admin'
import PhoneButton from '../button'
import PropTypes from 'prop-types'
import SMS from '../sms/sms'
import React from 'react'

class Contact extends React.Component {

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    program: PropTypes.object,
    onCall: PropTypes.func,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handleCall = this._handleCall.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleSMS = this._handleSMS.bind(this)

  render() {
    const { contact } = this.props
    const phone = this._getPhone()
    const email = this._getEmail()
    const buttons = this._getButtons()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-contact-container">
          <div className="maha-phone-contact">
            <div className="maha-phone-contact-header">
              <ContactAvatar { ...contact } />
              <h2>{ contact.display_name }</h2>
              { email &&
                <p>{ email.address }</p>
              }
              { phone &&
                <p>{ phone.formatted }</p>
              }
              <div className="maha-phone-actions" >
                { buttons.map((button, index) => (
                  <div className="maha-phone-action" key={`action_${index}`}>
                    <PhoneButton { ...button } />
                  </div>
                ))}
              </div>
            </div>
            <div className="maha-phone-contact-body">
              <List { ...this._getList() } />
            </div>
          </div>
        </div>
      </ModalPanel>
    )
  }

  _getButtons() {
    const { contact } = this.props
    const disabled = contact.phone_numbers.length === 0
    return [
      { icon: 'comments', label: 'sms', handler: this._handleSMS, disabled },
      { icon: 'phone', label: 'call', handler: this._handleCall, disabled },
      { icon: 'info', label: 'profile', handler: this._handleInfo }
    ]
  }

  _getEmail() {
    const { contact } = this.props
    return contact.email_addresses.find(email => {
      return email.is_primary
    })
  }

  _getList() {
    const { contact } = this.props
    return {
      sections: [
        {
          title: 'Email Addresses',
          items: [
            ...contact.email_addresses.length > 0 ? contact.email_addresses.map(email_address => ({
              content: email_address.address
            })) : [
              { content: 'none' }
            ]
          ]
        }, {
          title: 'Phone Numbers',
          items: [
            ...contact.phone_numbers.length > 0 ? contact.phone_numbers.map(phone_number => ({
              content: <Button { ...this._getCallButton(phone_number) } />
            })) : [
              { content: 'none' }
            ]
          ]
        }, {
          title: 'Mailing Adresses',
          items: [
            ...contact.mailing_addresses.length > 0 ? contact.mailing_addresses.map(mailing_address => ({
              content: (
                <div>
                  <div>
                    { mailing_address.address.street_1 }
                  </div>
                  { mailing_address.address.street_2 &&
                    <div>{ mailing_address.address.street_2 }</div>
                  }
                  <div>
                    { mailing_address.address.city }, { mailing_address.address.state_province } { mailing_address.address.postal_code }
                  </div>
                </div>
              )
            })) : [
              { content: 'none' }
            ]
          ]
        }
      ]
    }
  }

  _getCallButton(phone_number) {
    return {
      label: phone_number.formatted,
      className: 'link',
      handler: () => {}
    }
  }

  _getPanel() {
    return {
      title: 'Contact',
      leftItems: [
        { icon: 'chevron-left', handler: this._handleBack }
      ]
    }
  }

  _getPhone() {
    const { contact } = this.props
    return contact.phone_numbers.find(phone_number => {
      return phone_number.is_primary
    })
  }

  _getSMS() {
    const { contact, program, onPop, onPush } = this.props
    return {
      phone_id: contact.phone_id,
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
    this.props.onCall({
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
  contact: `/api/admin/crm/contacts/${props.contact_id}`
})

export default Container(mapResources)(Contact)
