import WorkflowEnrollment from '@apps/automation/models/enrollment'
import WorkflowStep from '@apps/automation/models/step'
import PhoneNumber from '@apps/maha/models/phone_number'
import SmsCampaignResult from './sms_campaign_result'
import Model from '@core/objects/model'
import Program from '@apps/crm/models/program'

const SmsCampaign = new Model({

  tableName: 'campaigns_sms_campaigns',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return `${this.get('direction')} sms campaign `
    },

    object_url: function() {
      return `/campaigns/sms/${this.get('id')}`
    }

  },

  enrollments() {
    return this.hasMany(WorkflowEnrollment, 'sms_campaign_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  results() {
    return this.hasOne(SmsCampaignResult, 'sms_campaign_id')
  },

  steps() {
    return this.hasMany(WorkflowStep, 'sms_campaign_id').query(qb => {
      qb.where('is_active', true)
    })
  }

})

export default SmsCampaign
