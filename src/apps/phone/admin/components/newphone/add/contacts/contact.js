import ContactAvatar from '@apps/crm/admin/tokens/contact_avatar'
import { Button, Container, List, ModalPanel } from '@admin'
import PhoneButton from '../../button'
import PropTypes from 'prop-types'
import SMS from '../../sms'
import React from 'react'

class Contact extends React.Component {

  static contextTypes = {
    admin: PropTypes.object,
    phone: PropTypes.object,
    router: PropTypes.object,
    tasks: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    program: PropTypes.object,
    onPop: PropTypes.func,
    onPush: PropTypes.func
  }

  _handleBack = this._handleBack.bind(this)
  _handlePlaceCall = this._handlePlaceCall.bind(this)
  _handleInfo = this._handleInfo.bind(this)
  _handleSMS = this._handleSMS.bind(this)

  render() {
    const { contact } = this.props
    const phone = this._getPhone()
    const buttons = this._getButtons()
    return (
      <ModalPanel { ...this._getPanel() }>
        <div className="maha-phone-detail-container">
          <div className="maha-phone-detail">
            <div className="maha-phone-detail-header">
              <ContactAvatar { ...contact } />
              <h2>{ contact.display_name }</h2>
              { phone &&
                <p>{ phone.formatted }</p>
              }
              <div className="maha-phone-actions">
                { buttons.map((button, index) => (
                  <div className="maha-phone-action" key={`action_${index}`}>
                    <PhoneButton { ...button } />
                  </div>
                ))}
              </div>
            </div>
            <div className="maha-phone-detail-body">
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
      { icon: 'info', label: 'profile', handler: this._handleInfo },
      { icon: 'phone', label: 'call', handler: this._handlePlaceCall, disabled },
      { icon: 'comments', label: 'sms', handler: this._handleSMS, disabled }
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
          title: 'Phone Numbers',
          items: [
            ...contact.phone_numbers.length > 0 ? contact.phone_numbers.map(phone_number => ({
              label: 'Phone',
              content: <Button { ...this._getCallButton(phone_number) } />
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
      handler: this._handleCall.bind(this, phone_number)
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

  _getSMS(phone_number) {
    const { program, onPop, onPush } = this.props
    return {
      phone_id: phone_number.id,
      program,
      onPop,
      onPush
    }
  }

  _handleBack() {
    this.props.onPop()
  }

  _handleCall(number, type) {
    const { admin, phone } = this.context
    const { contact } = this.props
    this.context.phone.onCall({
      type,
      number,
      contact
    })
  }

  _handleInfo() {
    const { contact } = this.props
    this.context.router.history.push(`/crm/contacts/${contact.id}`)
  }

  _handlePlace(number) {
    this.context.tasks.open({
      items: [
        { label: 'Call with Cell phone', handler: this._handleCall.bind(this, number, 'cell') },
        { label: 'Call with Maha phone', handler: this._handleCall.bind(this, number, 'client') },
      ]
    })
  }

  _handlePlaceCall() {
    const { contact } = this.props
    const { phone_numbers } = contact
    if(phone_numbers.length === 1) {
      const phone_number =
      this._handlePlace(phone_numbers[0].number)
    } else {
      this.context.tasks.open({
        items: phone_numbers.map(phone_number => ({
          label: phone_number.number,
          handler: this._handlePlace.bind(this, phone_number.number)
        }))
      })
    }
  }

  _handleSMS() {
    const { contact } = this.props
    if(contact.phone_numbers.length === 1) {
      const phone_number = contact.phone_numbers[0]
      return this.props.onPush(SMS, this._getSMS(phone_number))
    }
    this.context.tasks.open({
      items: contact.phone_numbers.map(phone_number => (
        { label: phone_number.number, handler: () => {
          this.props.onPush(SMS, this._getSMS(phone_number))
        }}
      ))
    })
  }

}

const mapResources = (props, context) => ({
  contact: `/api/admin/crm/contacts/${props.contact_id}`
})

export default Container(mapResources)(Contact)
