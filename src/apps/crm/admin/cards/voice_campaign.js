import WorkflowActions from '../components/workflow_actions'
import { Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class VoiceCampaign extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    enrollment: PropTypes.object,
    voice_campaign: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { enrollment, voice_campaign } = this.props
    return (
      <div className="crm-workflow-card">
        <WorkflowActions enrollment={ enrollment } trigger_type={`${voice_campaign.direction}_${voice_campaign.type}`} />
      </div>
    )
  }

}

const mapResources = (props, context) => ({
  voice_campaign: `/api/admin/crm/campaigns/voice/${props.activity.data.voice_campaign_id}`,
  enrollment: `/api/admin/crm/campaigns/voice/${props.activity.data.voice_campaign_id}/calls/${props.activity.data.enrollment_id}`
})

export default Container(mapResources)(VoiceCampaign)
