import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import PhoneNumber from '@apps/crm/models/phone_number'
import Program from '@apps/crm/models/program'
import Model from '@core/objects/model'
import Number from './number'
import User from './user'

const Call = new Model({

  tableName: 'maha_calls',

  rules: {},

  virtuals: {},

  enrollment() {
    return this.hasOne(WorkflowEnrollment, 'call_id')
  },

  from() {
    return this.belongsTo(Number, 'from_id')
  },

  from_user() {
    return this.belongsTo(User, 'from_user_id')
  },

  to() {
    return this.belongsTo(Number, 'to_id')
  },

  to_user() {
    return this.belongsTo(User, 'to_user_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  user() {
    return this.belongsTo(User, 'user_id')
  }

})

export default Call
