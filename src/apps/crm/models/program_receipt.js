import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const ProgramReceipt = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_program_receipts',

  rules: {},

  virtuals: {}

})

export default ProgramReceipt
