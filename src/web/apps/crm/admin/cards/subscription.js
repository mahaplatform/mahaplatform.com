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
    const { program, email_address } = activity.data
    return (
      <div className="crm-timeline-item-card-subscription">
        <strong>Email:</strong> { email_address.address }<br />
        <strong>Program:</strong> { program.title }
      </div>
    )
  }

}

export default Subscription
