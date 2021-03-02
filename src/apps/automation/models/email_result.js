import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const EmailResult = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_email_results',

  rules: {},

  virtuals: {}

})

export default EmailResult
