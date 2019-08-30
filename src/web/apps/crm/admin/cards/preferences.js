import PropTypes from 'prop-types'
import React from 'react'

class Preferences extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    if(!activity.data) return null
    const { program, email_address, phone_number, actions } = activity.data
    return (
      <div className="crm-timeline-item-card-subscription">
        <div className="crm-timeline-item-card-subscription-item">
          <strong>Program:</strong> { program }<br />
        </div>
        { phone_number &&
          <div className="crm-timeline-item-card-subscription-item">
            <strong>Phone Number:</strong> { phone_number }
          </div>
        }
        { email_address &&
          <div className="crm-timeline-item-card-subscription-item">
            <strong>Email Address:</strong> { email_address }
          </div>
        }
        <ul>
          { actions.map((item, index) => (
            <li key={`item_${index}`}>
              { item.action === 'unconsented' &&
                <span>opted out of all communications</span>
              }
              { item.action === 'consented' &&
                <span>opted in to all communications</span>
              }
              { item.action === 'subscribed' &&
                <span>subscribed to { item.topic }</span>
              }
              { item.action === 'unsubscribed' &&
                <span>unsubscribed from { item.topic }</span>
              }
            </li>
          )) }
        </ul>
      </div>
    )
  }

}

export default Preferences
