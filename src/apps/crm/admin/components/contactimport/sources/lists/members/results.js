import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.PureComponent {

  static propTypes = {
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="contactimport-contacts">
        { records.map((contact, index) => (
          <div className="contactimport-contact" key={`contact_${index}`}>
            <div className="contactimport-contact-label">
              { contact.first_name } { contact.last_name } (
              { contact.email_addresses.length > 0 ? contact.email_addresses[0].address: 'no email' }
              )
            </div>
          </div>
        )) }
      </div>
    )
  }

}

export default Results
