import PropTypes from 'prop-types'
import Activity from './activity'
import moment from 'moment'
import React from 'react'

class Activities extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    contact: PropTypes.object,
    activities: PropTypes.array,
    months: PropTypes.array,
    status: PropTypes.string,
    onFetch: PropTypes.func
  }

  static defaultProps = {}

  render() {
    const { contact, months, status } = this.props
    if(status !== 'ready') return null
    return (
      <div className="crm-timeline">
        <div className="crm-timeline-buttons">
          <div className="ui fluid basic buttons">
            <div className="ui button">Call</div>
            <div className="ui button">Email</div>
            <div className="ui button">File</div>
            <div className="ui button">Note</div>
          </div>
        </div>
        { months.map((month, index) => [
          <div className="crm-timeline-month" key={ `date_${index}` }>
            { index > 0 &&
              <div className="crm-timeline-item">
                <div className="crm-timeline-item-rail" />
                <div className="crm-timeline-item-content">
                  <div className="crm-timeline-date" key={ `date_${index}` }>
                    { moment(month.date).format('MMMM YYYY') }
                  </div>
                </div>
              </div>
            }
            { month.activities.map((activity, index) => (
              <Activity contact={ contact } activity={ activity } key={ `event_${index}` } />
            )) }
          </div>
        ]) }
      </div>
    )
  }

  componentDidMount() {
    const { contact } = this.props
    this.props.onFetch(contact.id)
  }

}

export default Activities
