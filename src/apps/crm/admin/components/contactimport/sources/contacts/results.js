import PropTypes from 'prop-types'
import React from 'react'

class Contacts extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="contactimport-contacts">
        { records.map((contact, index) => (
          <div className="contactimport-contact" key={`contact_${index}`}>
            { contact.photo &&
              <div className="contactimport-contact-avatar">
                <img src={ contact.photo } />
              </div>
            }
            <div className="contactimport-contact-label">
              <strong>{ contact.first_name } { contact.last_name }</strong><br />
              { contact.email_addresses.length > 0 ? contact.email_addresses[0].address: 'no email' }
            </div>
          </div>
        )) }
      </div>
    )
  }

}

export default Contacts
