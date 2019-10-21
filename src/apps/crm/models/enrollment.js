import Model from '../../../core/objects/model'
import VoiceCampaign from './voice_campaign'
import SMSCampaign from './sms_campaign'
import Workflow from './workflow'
import Contact from './contact'

const Enrollment = new Model({

  tableName: 'crm_enrollments',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  sms_campaign() {
    return this.belongsTo(SMSCampaign, 'sms_campaign_id')
  },

  voice_campaign() {
    return this.belongsTo(VoiceCampaign, 'voice_campaign_id')
  },

  workflow() {
    return this.belongsTo(Workflow, 'workflow_id')
  }

})

export default Enrollment
