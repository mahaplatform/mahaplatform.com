import Model from '../../../core/objects/model'
import WorkflowAction from './workflow_action'
import VoiceCampaign from './voice_campaign'
import SmsCampaign from './sms_campaign'
import Workflow from './workflow'
import Response from './response'
import Contact from './contact'

const WorkflowEnrollment = new Model({

  tableName: 'crm_workflow_enrollments',

  rules: {},

  virtuals: {},

  actions() {
    return this.hasMany(WorkflowAction, 'enrollment_id')
  },

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  response() {
    return this.belongsTo(Response, 'response_id')
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

export default WorkflowEnrollment
