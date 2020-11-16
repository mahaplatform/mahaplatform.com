import PhoneNumber from '../../maha/models/phone_number'
import WorkflowEnrollment from './workflow_enrollment'
import SmsCampaignResult from './sms_campaign_result'
import Model from '../../../core/objects/model'
import WorkflowStep from './workflow_step'
import Program from './program'

const SmsCampaign = new Model({

  tableName: 'crm_sms_campaigns',

  rules: {},

  virtuals: {

    object_text: function() {
      return this.get('title')
    },

    object_type: function() {
      return `${this.get('direction')} sms campaign `
    },

    object_url: function() {
      return `/admin/crm/campaigns/sms/${this.get('id')}`
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