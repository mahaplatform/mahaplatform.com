import CallActivity from '@apps/maha/models/call_activity'
import PhoneNumber from '@apps/crm/models/phone_number'
import Program from '@apps/crm/models/program'
import Number from '@apps/maha/models/number'
import User from '@apps/maha/models/user'
import Call from '@apps/maha/models/call'
import Model from '@core/objects/model'

const CallConnection = new Model({

  databaseName: 'maha',

  tableName: 'call_connections',

  rules: {},

  virtuals: {},

  activities() {
    return this.hasMany(CallActivity, 'call_id')
  },

  call() {
    return this.belongsTo(Call, 'call_id')
  },

  from_number() {
    return this.belongsTo(Number, 'from_number_id')
  },

  from_phone_number() {
    return this.belongsTo(PhoneNumber, 'from_phone_number_id')
  },

  from_program() {
    return this.belongsTo(Program, 'from_program_id')
  },

  from_user() {
    return this.belongsTo(User, 'from_user_id')
  },

  to_number() {
    return this.belongsTo(Number, 'to_number_id')
  },

  to_phone_number() {
    return this.belongsTo(PhoneNumber, 'to_phone_number_id')
  },

  to_program() {
    return this.belongsTo(Program, 'to_program_id')
  },

  to_user() {
    return this.belongsTo(User, 'to_user_id')
  }

})

export default CallConnection
