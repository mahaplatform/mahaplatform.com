import PhoneNumber from '../../maha/models/phone_number'
import WorkflowEnrollment from './workflow_enrollment'
import Model from '../../../core/objects/model'
import WorkflowStep from './workflow_step'
import Program from './program'

const SmsCampaign = new Model({

  tableName: 'crm_sms_campaigns',

  rules: {},

  virtuals: {},

  enrollments() {
    return this.hasMany(WorkflowEnrollment, 'sms_campaign_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  steps() {
    return this.hasMany(WorkflowStep, 'sms_campaign_id')
  }

})

export default SmsCampaign
