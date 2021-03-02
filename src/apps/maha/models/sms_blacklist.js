import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const SmsBlacklist = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_sms_blacklists',

  rules: {},

  virtuals: {}

})

export default SmsBlacklist
