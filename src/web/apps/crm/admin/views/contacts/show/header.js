import { Avatar } from 'maha-admin'
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
        <Avatar user={ contact } width="120" />
        <div className="contact-header-buttons">
          <div className="contact-header-button">
            <button onClick={ this._handleMessage }>
              <i className="fa fa-comment" />
            </button>
          </div>
          <div className="contact-header-button">
            <button onClick={ this._handleCall }>
              <i className="fa fa-phone" />
            </button>
          </div>
          <div className="contact-header-button">
            <button onClick={ this._handleEmail }>
              <i className="fa fa-envelope" />
            </button>
          </div>
        </div>
      </div>
    )
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
