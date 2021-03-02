import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'

const Raw = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'raws',

  rules: {},

  virtuals: {}

})

export default Raw
