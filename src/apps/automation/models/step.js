import VoiceCampaign from '@apps/campaigns/models/voice_campaign'
import SmsCampaign from '@apps/campaigns/models/sms_campaign'
import Model from '@core/objects/model'
import WorkflowAction from './action'
import Workflow from './workflow'

const WorkflowStep = new Model({

  tableName: 'automation_steps',

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
