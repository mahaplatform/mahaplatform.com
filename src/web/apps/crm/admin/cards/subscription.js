import PropTypes from 'prop-types'
import React from 'react'

class Subscription extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    if(!activity.data) return null
    const { program, phone_number, email_address } = activity.data
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
      </div>
    )
  }

}

export default Subscription
