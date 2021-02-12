import { Format } from '@admin'
import PropTypes from 'prop-types'
import moment from 'moment'
import React from 'react'

class CallActivities extends React.PureComponent {

  static propTypes = {
    activities: PropTypes.array,
    call: PropTypes.object
  }

  render() {
    const { activities, call } = this.props
    const started_at = moment(call.started_at)
    return (
      <div className="phone-call-activities">
        { activities.map((activity, index) => (
          <div className="phone-call-activities-activity" key={`activity_${index}`}>
            <i className="fa fa-circle" />
            <span>
              <Format value={ moment(activity.created_at).diff(started_at, 'second') } format="duration" />
            </span>
            { this._getDescription(activity) }
          </div>
        )) }
        { call.status === 'in-progress' &&
        <div className="phone-call-activities-activity active">
          <i className="fa fa-circle" />
          <span>
            <Format value={ moment().diff(started_at, 'second') } format="duration" />
          </span>
          Call is active
        </div>
        }
      </div>
    )
  }

  _getDescription(activity) {
    const parts = []
    if(activity.user) parts.push(activity.user.full_name)
    parts.push(this._getType(activity))
    return parts.join(' ')
  }

  _getType(activity) {
    const { client, to_user, type } = activity
    if(type === 'hold') return 'placed the call on hold'
    if(type === 'unhold') return 'took the call off hold'
    if(type === 'hangup') return 'hungup the call'
    if(type === 'transfer') return `transfered the call to ${to_user.full_name}`
    if(type === 'forward') return `forwarded the call to ${client} phone`
  }

}

export default CallActivities
