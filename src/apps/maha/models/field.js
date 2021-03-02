import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Field = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_fields',

  rules: {},

  virtuals: {}

})

export default Field
