import WorkflowActions from '../components/workflow_actions'
import { Container } from 'maha-admin'
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
        <WorkflowActions workflow={ sms_campaign } enrollment={ enrollment } actions={ actions } trigger_type={`${sms_campaign.direction}_${sms_campaign.type}`} />
      </div>
    )
  }

}

const mapResources = (props, context) => ({
  actions: `/api/admin/crm/campaigns/sms/${props.activity.data.sms_campaign_id}/sessions/${props.activity.data.enrollment_id}/actions`,
  sms_campaign: `/api/admin/crm/campaigns/sms/${props.activity.data.sms_campaign_id}`,
  enrollment: `/api/admin/crm/campaigns/sms/${props.activity.data.sms_campaign_id}/sessions/${props.activity.data.enrollment_id}`
})

export default Container(mapResources)(SMSCampaign)
