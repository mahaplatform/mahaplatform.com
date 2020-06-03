import ContactToken from '../../../tokens/contact'
import PropTypes from 'prop-types'
import React from 'react'

class Contacts extends React.Component {

  static propTypes = {
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-phone-contacts-results">
        { records.map((contact, index) => (
          <div className="maha-phone-contacts-result" key={`record_${index}`}>
            <div className="maha-phone-contacts-result-token">
              <ContactToken { ...contact } />
            </div>
            <div className="maha-phone-contacts-result-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

}

export default Contacts
