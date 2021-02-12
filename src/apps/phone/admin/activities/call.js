import CallActivities from '@apps/phone/admin/components/call_activities'
import { Container } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'
import _ from 'lodash'

class Call extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    activities: PropTypes.array,
    call: PropTypes.object
  }

  render() {
    const { activities, call } = this.props
    return (
      <div className="crm-workflow-card">
        <table className="ui celled compact unstackable table">
          <tbody>
            <tr>
              <td>Duration</td>
              <td>{ this._getDuration(call.duration) }</td>
            </tr>
          </tbody>
        </table>
        <CallActivities activities={ activities } call={ call } />
      </div>
    )
  }

  _getDuration(duration) {
    const pad = (value) => _.padStart(value, 2, 0)
    const minutes = Math.floor(duration / 60)
    const seconds = (duration  - (minutes * 60)) % 60
    const parts = [ pad(minutes), pad(seconds) ]
    return parts.join(':')
  }

}

const mapResources = (props, context) => ({
  activities: `/api/admin/phone/calls/${props.activity.data.call_id}/activities`,
  call: `/api/admin/phone/calls/${props.activity.data.call_id}`
})

export default Container(mapResources)(Call)
