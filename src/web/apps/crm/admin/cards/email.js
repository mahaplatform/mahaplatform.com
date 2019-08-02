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
    const { date, from, subject, text } = activity.data
    return (
      <div className="crm-card-email">
        <div className="crm-card-header">
          <strong>Date:</strong> { moment(date).format('MMMM D, YYYY @ h:mm A') }<br />
          <strong>From:</strong> { from.text }<br />
          <strong>Subject:</strong> { subject }<br />
        </div>
        <div className="crm-card-body">
          { text && text.split('\n').map((line, index) => (
            <span key={`line_${index}`}>{ line }<br /></span>
          )) }
        </div>
        <div className="link">View Email</div>
      </div>
    )
  }

}

export default Email
