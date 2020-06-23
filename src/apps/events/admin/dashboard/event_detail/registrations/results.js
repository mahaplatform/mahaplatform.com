import ContactToken from '../../../../../crm/admin/tokens/contact'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.Component {

  static contextTypes = {
    card: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    records: PropTypes.array
  }

  render() {
    const { records } = this.props
    return (
      <div className="maha-list">
        { records.map((registration, index) => (
          <div className="maha-list-item" key={`registration_${index}`}>
            <ContactToken {...registration.contact } />
          </div>
        ))}
      </div>
    )
  }

  _getButton(registration) {
    const { config } = this.props
    return {
      label: registration.contact.display_name,
      className: 'link',
      route: `/admin/events/events/${config.event_id}/registrations/${registration.id}`
    }
  }
}

export default Results
