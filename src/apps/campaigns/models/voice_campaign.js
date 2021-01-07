import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import WorkflowStep from '@apps/automation/models/workflow_step'
import VoiceCampaignResult from './voice_campaign_result'
import PhoneNumber from '@apps/maha/models/phone_number'
import Model from '@core/objects/model'
import Program from '@apps/crm/models/program'

const VoiceCampaign = new Model({

  databaseName: 'maha',

  tableName: 'crm_voice_campaigns',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return `${this.get('direction')} voice campaign `
    },

    object_url: function() {
      return `/campaigns/voice/${this.get('id')}`
    }

  },

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
