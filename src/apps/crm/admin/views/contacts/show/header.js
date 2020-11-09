import ContactAvatarToken from '@apps/crm/admin/tokens/contact_avatar'
import { Button } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import SMS from './sms'

class Header extends React.Component {

  static propTypes = {
    contact: PropTypes.object
  }

  _handleCall = this._handleCall.bind(this)
  _handleEmail = this._handleEmail.bind(this)
  _handleMessage = this._handleMessage.bind(this)

  render() {
    const { contact } = this.props
    return (
      <div className="contact-header">
        <div className="contact-header-avatar">
          <ContactAvatarToken { ...contact } />
          <h1>{ contact.display_name }</h1>
        </div>
      </div>
    )
  }

  _getEmail() {
    const { contact } = this.props
    return {
      className: 'contact-header-button',
      disabled: contact.email === null,
      icon: 'envelope',
      onClick: this._handleEmail
    }
  }

  _getMessage() {
    const { contact } = this.props
    return {
      className: 'contact-header-button',
      disabled: contact.phone === null,
      icon: 'comment',
      modal: <SMS contact={ contact } />
    }
  }

  _getPhone() {
    const { contact } = this.props
    return {
      className: 'contact-header-button',
      disabled: contact.phone === null,
      icon: 'phone',
      onClick: this._handleCall
    }
  }

  _handleCall() {
    const { contact } = this.props
    window.location.href = `tel:${contact.phone}`
  }

  _handleEmail() {
    const { contact } = this.props
    window.location.href = `mailto:${contact.email}`
  }

  _handleMessage() {
    const { contact } = this.props
    window.location.href = `mailto:${contact.email}`
  }

}

export default Header
