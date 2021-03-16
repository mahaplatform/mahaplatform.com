import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Record = new Model(knex, {

  databaseName: 'maha',

  tableName: 'websites_records',

  rules: {},

  virtuals: {}

})

export default Record
