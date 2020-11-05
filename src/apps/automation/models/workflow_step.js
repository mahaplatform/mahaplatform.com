import VoiceCampaign from '../../campaigns/models/voice_campaign'
import SmsCampaign from '../../campaigns/models/sms_campaign'
import Model from '@core/objects/model'
import WorkflowAction from './workflow_action'
import Workflow from './workflow'

const WorkflowStep = new Model({

  tableName: 'crm_workflow_steps',

  rules: {},

  virtuals: {},

  actions() {
    return this.hasMany(WorkflowAction, 'step_id')
  },

  sms_campaign() {
    return this.belongsTo(SmsCampaign, 'sms_campaign_id')
  },

  voice_campaign() {
    return this.belongsTo(VoiceCampaign, 'voice_campaign_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default WorkflowStep
