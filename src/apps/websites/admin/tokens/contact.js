import { parsePhoneNumberFromString } from 'libphonenumber-js'
import PropTypes from 'prop-types'
import React from 'react'

class ContactToken extends React.PureComponent {

  static propTypes = {
    contact: PropTypes.object
  }

  render() {
    const { contact } = this.props
    return (
      <>
        <strong>{ this._getName() }</strong>
        { contact.email &&
          <div>{ contact.email }</div>
        }
        { contact.phone &&
          <div>{ this._getFormatted(contact.phone) }</div>
        }
        { contact.address &&
          <div>{ contact.address.description }</div>
        }
      </>
    )
  }

  _getFormatted(number) {
    const parsed = parsePhoneNumberFromString(number, 'US')
    const matches = parsed.number.match(/^\+1(\d{3})(\d{3})(\d{4})/)
    if(!matches) return number
    const formatted = matches.slice(1,4).join('-')
    return parsed.ext ? `${formatted} ext. ${parsed.ext}` : formatted
  }

  _getName() {
    const { contact } = this.props
    return [contact.first_name, contact.last_name].join(' ')
  }

}

export default ContactToken
