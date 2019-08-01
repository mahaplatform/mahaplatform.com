import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Email extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    const { date, from, to, subject, body } = activity.data
    return (
      <div className="crm-timeline-item-card-email">
        <div className="crm-timeline-item-card-email-header">
          <strong>Date:</strong> { moment(date).format('MMMM D, YYYY @ h:mm A') }<br />
          <strong>From:</strong> { from }<br />
          <strong>To:</strong> { to }<br />
          <strong>Subject:</strong> { subject }<br />
        </div>
        <div className="crm-timeline-item-card-email-body">
          { body }
        </div>
        <div className="link">View Email</div>
      </div>
    )
  }

}

export default Email
