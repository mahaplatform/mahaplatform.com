import WorkflowActions from '@apps/automation/admin/components/workflow_actions'
import { Button, Container } from '@admin'
import PropTypes from 'prop-types'
import React from 'react'

class SMSCampaign extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    actions: PropTypes.array,
    enrollment: PropTypes.object,
    sms_campaign: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { actions, enrollment, sms_campaign } = this.props
    return (
      <div className="crm-workflow-card">
        <table className="ui celled compact unstackable table">
          <tbody>
            <tr>
              <td>SMS Campaign</td>
              <td><Button { ...this._getCampaign() } /></td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{ sms_campaign.phone_number.formatted }</td>
            </tr>
          </tbody>
        </table>
        <WorkflowActions workflow={ sms_campaign } enrollment={ enrollment } actions={ actions } trigger_type={`${sms_campaign.direction}_${sms_campaign.type}`} />
      </div>
    )
  }

  _getCampaign() {
    const { sms_campaign } = this.props
    return {
      label: sms_campaign.title,
      className: 'link',
      route: `/admin/campaigns/sms/${sms_campaign.id}`
    }
  }

}

const mapResources = (props, context) => ({
  actions: `/api/admin/campaigns/sms/${props.activity.data.sms_campaign_id}/sessions/${props.activity.data.enrollment_id}/actions`,
  sms_campaign: `/api/admin/campaigns/sms/${props.activity.data.sms_campaign_id}`,
  enrollment: `/api/admin/campaigns/sms/${props.activity.data.sms_campaign_id}/sessions/${props.activity.data.enrollment_id}`
})

export default Container(mapResources)(SMSCampaign)
