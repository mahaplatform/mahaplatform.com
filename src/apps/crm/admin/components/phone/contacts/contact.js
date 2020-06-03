import ContactAvatar from '../../../tokens/contact_avatar'
import { ModalPanel } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class Contact extends React.Component {

  static contextTypes = {
    phone: PropTypes.object
  }

  static propTypes = {
    contact: PropTypes.object,
    program: PropTypes.object,
    onPop: PropTypes.func
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
          <ContactAvatar { ...contact } />
          <h2>{ contact.display_name }</h2>
          <p>{ contact.email }</p>
          <p>{ contact.phone }</p>
          <div className="maha-phone-contact-actions">
            <div className="maha-phone-contact-action">
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

  _handleBack() {
    this.props.onPop()
  }

  _handleCall() {
    const { contact, program } = this.props
    this.context.phone.call(program.phone_number.number, contact.phone)
  }

  _handleInfo() {}

  _handleSMS() {}

}

export default Contact
