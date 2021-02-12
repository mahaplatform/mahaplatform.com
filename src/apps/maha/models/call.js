import WorkflowEnrollment from '@apps/automation/models/workflow_enrollment'
import CallConnection from '@apps/maha/models/call_connection'
import CallActivity from '@apps/maha/models/call_activity'
import PhoneNumber from '@apps/crm/models/phone_number'
import Program from '@apps/crm/models/program'
import Number from '@apps/maha/models/number'
import Model from '@core/objects/model'

const Call = new Model({

  databaseName: 'maha',

  tableName: 'maha_calls',

  rules: {},

  virtuals: {},

  activities() {
    return this.hasMany(CallActivity, 'call_id')
  },

  connections() {
    return this.hasMany(CallConnection, 'call_id')
  },

  enrollment() {
    return this.hasOne(WorkflowEnrollment, 'call_id')
  },

  from_number() {
    return this.belongsTo(Number, 'from_number_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  },

  to_number() {
    return this.belongsTo(Number, 'to_number_id')
  }

})

export default Call
