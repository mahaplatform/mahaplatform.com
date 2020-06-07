import ContactToken from '../../../tokens/contact'
import PropTypes from 'prop-types'
import React from 'react'

class Contacts extends React.Component {

  static propTypes = {
    records: PropTypes.array,
    onChoose: PropTypes.func
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-phone-search-results">
        { records.map((contact, index) => (
          <div className="maha-phone-search-result" key={`record_${index}`} onClick={ this._handleChoose.bind(this, contact) }>
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

  _handleChoose(contact) {
    this.props.onChoose(contact)
  }

}

export default Contacts
