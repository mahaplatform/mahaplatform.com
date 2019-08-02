import { Avatar, Button } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

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
          <Avatar user={ contact } width="120" />
          <h1>{ contact.display_name }</h1>
          <p>{ contact.email }</p>
          <p>{ contact.phone }</p>
        </div>
        <div className="contact-header-controls">
          <div className="contact-header-items">
            <div className="contact-header-item">
              <Button { ...this._getMessage() } />
            </div>
            <div className="contact-header-item">
              <Button { ...this._getPhone() } />
            </div>
            <div className="contact-header-item">
              <Button { ...this._getEmail() } />
            </div>
          </div>
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
      onClick: this._handleMessage
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
