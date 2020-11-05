import WorkflowActions from '@apps/automation/admin/components/workflow_actions'
import { Button, Container } from 'maha-admin'
import PropTypes from 'prop-types'
import React from 'react'

class VoiceCampaign extends React.PureComponent {

  static contextTypes = {}

  static propTypes = {
    actions: PropTypes.array,
    enrollment: PropTypes.object,
    voice_campaign: PropTypes.object
  }

  static defaultProps = {}

  render() {
    const { actions, enrollment, voice_campaign } = this.props
    return (
      <div className="crm-workflow-card">
        <table className="ui celled compact unstackable table">
          <tbody>
            <tr>
              <td>Voice Campaign</td>
              <td><Button { ...this._getCampaign() } /></td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>{ voice_campaign.phone_number.formatted }</td>
            </tr>
          </tbody>
        </table>
        <WorkflowActions workflow={ voice_campaign } enrollment={ enrollment } actions={ actions } trigger_type={`${voice_campaign.direction}_${voice_campaign.type}`} />
      </div>
    )
  }

  _getCampaign() {
    const { voice_campaign } = this.props
    return {
      label: voice_campaign.title,
      className: 'link',
      route: `/admin/campaigns/sms/${voice_campaign.id}`
    }
  }

}

const mapResources = (props, context) => ({
  actions: `/api/admin/campaigns/voice/${props.activity.data.voice_campaign_id}/calls/${props.activity.data.enrollment_id}/actions`,
  voice_campaign: `/api/admin/campaigns/voice/${props.activity.data.voice_campaign_id}`,
  enrollment: `/api/admin/campaigns/voice/${props.activity.data.voice_campaign_id}/calls/${props.activity.data.enrollment_id}`
})

export default Container(mapResources)(VoiceCampaign)
