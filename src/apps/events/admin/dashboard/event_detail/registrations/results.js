import { Format } from 'maha-admin'
import PaymentToken from '../../../tokens/payment'
import PropTypes from 'prop-types'
import React from 'react'

class Results extends React.Component {

  static contextTypes = {
    card: PropTypes.object,
    router: PropTypes.object
  }

  static propTypes = {
    config: PropTypes.object,
    records: PropTypes.array,
    isExpanded: PropTypes.bool
  }

  render() {
    const { records, isExpanded } = this.props
    return (
      <div className="maha-list">
        { records.map((registration, index) => (
          <div className="maha-list-item maha-list-item-link" key={`registration_${index}`} onClick={ this._handleRegistration.bind(this, registration) }>
            <div className="maha-list-item-label">
              { registration.contact.display_name }
            </div>
            { isExpanded &&
              <div className="maha-list-item-data">
                <Format value={ registration.revenue } format='currency' />
              </div>
            }
            { isExpanded &&
              <div className="maha-list-item-data">
                <PaymentToken value={ registration.is_paid } />
              </div>
            }
            <div className="maha-list-item-data">
              <Format value={ registration.created_at } format='datetime' />
            </div>
            <div className="maha-list-item-proceed">
              <i className="fa fa-chevron-right" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  _handleRegistration(registration) {
    const { config } = this.props
    this.context.router.history.push(`/events/events/${config.event_id}/registrations/${registration.id}`)
  }
}

export default Results
