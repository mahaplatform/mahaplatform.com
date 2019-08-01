import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class Blast extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activity: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { activity } = this.props
    const { date, subject, actions } = activity.data
    return (
      <div className="crm-timeline-item-card-blast">
        <div className="crm-timeline-item-card-blast-header">
          <strong>Date:</strong> { moment(date).format('MMMM D, YYYY @ h:mm A') }<br />
          <strong>Subject:</strong> { subject }<br />
        </div>
        { actions.map((action, index) => (
          <div key={`action_${index}`}>{ action }</div>
        )) }
      </div>
    )
  }

  componentDidMount() {}

  componentDidUpdate(prevProps) {}

}

export default Blast
