import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'
import PhoneNumber from './phone_number'
import Program from './program'
import Contact from './contact'

const SmsReceipt = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_sms_receipts',

  rules: {},

  virtuals: {},

  contact() {
    return this.belongsTo(Contact, 'contact_id')
  },

  phone_number() {
    return this.belongsTo(PhoneNumber, 'phone_number_id')
  },

  program() {
    return this.belongsTo(Program, 'program_id')
  }

})

export default SmsReceipt
