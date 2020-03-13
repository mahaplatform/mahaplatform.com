import VoiceCampaignResult from './voice_campaign_result'
import PhoneNumber from '../../maha/models/phone_number'
import WorkflowEnrollment from './workflow_enrollment'
import Model from '../../../core/objects/model'
import WorkflowStep from './workflow_step'
import Program from './program'

const VoiceCampaign = new Model({

  tableName: 'crm_voice_campaigns',

  rules: {},

  virtuals: {},

  enrollments() {
    return this.hasMany(WorkflowEnrollment, 'voice_campaign_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  results() {
    return this.hasOne(VoiceCampaignResult, 'voice_campaign_id')
  },

  steps() {
    return this.hasMany(WorkflowStep, 'voice_campaign_id').query(qb => {
      qb.where('is_active', true)
    })
  }

})

export default VoiceCampaign
