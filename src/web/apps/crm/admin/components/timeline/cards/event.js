import PropTypes from 'prop-types'
import numeral from 'numeral'
import moment from 'moment'
import React from 'react'

class Event extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    const { date, title, card, amount, transaction_id } = activity.data
    return (
      <div className="crm-timeline-item-card-event">
        <strong>Date:</strong> { moment(date).format('MMM DD, YYYY') }<br />
        <strong>Title:</strong> { title }<br />
        <strong>Card:</strong> { card }<br />
        <strong>Amount:</strong> { numeral(amount).format('$0.00') }<br />
        <strong>Transaction ID:</strong> { transaction_id}<br />
        <span className="link">View Registration</span>
      </div>
    )
  }

}

export default Event
