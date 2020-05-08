import WorkflowActions from '../components/workflow_actions'
import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class SMSCampaign extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    enrollment: PropTypes.object,
    sms_campaign: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { enrollment, sms_campaign } = this.props
    return (
      <div className="crm-workflow-card">
        <WorkflowActions enrollment={ enrollment } trigger_type={`${sms_campaign.direction}_${sms_campaign.type}`} />
      </div>
    )
  }

}

const mapResources = (props, context) => ({
  sms_campaign: `/api/admin/crm/campaigns/sms/${props.activity.data.sms_campaign_id}`,
  enrollment: `/api/admin/crm/campaigns/sms/${props.activity.data.sms_campaign_id}/sessions/${props.activity.data.enrollment_id}`
})

export default Container(mapResources)(SMSCampaign)
