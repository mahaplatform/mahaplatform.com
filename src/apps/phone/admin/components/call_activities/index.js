import { Format } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class CallActivities extends React.PureComponent {

  static propTypes = {
    activities: PropTypes.array,
    call: PropTypes.object
  }

  static defaultProps = {
    activities: [
      { tstamp: '2021-01-02 11:05:00', description: 'foo' },
      { tstamp: '2021-01-02 11:05:10', description: 'bar' },
      { tstamp: '2021-01-02 11:05:15', description: 'baz' },
      { tstamp: '2021-01-02 11:05:20', description: 'boom' }
    ]
  }

  render() {
    const { activities } = this.props
    const started_at = moment('2021-01-02 11:05:00')
    return (
      <div className="phone-call-activities">
        { activities.map((activity, index) => (
          <div className={ this._getClass(index) } key={`activity_${index}`}>
            <i className="fa fa-circle" />
            <span>
              <Format value={ moment(activity.tstamp).diff(started_at, 'second') } format="duration" />
            </span>
            { activity.description }
          </div>
        )) }
      </div>
    )
  }

  _getClass(index) {
    const { activities } = this.props
    const classes = ['phone-call-activities-activity']
    if(index === activities.length - 1) classes.push('active')
    return classes.join(' ')
  }

}

export default CallActivities
