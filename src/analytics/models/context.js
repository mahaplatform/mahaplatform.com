import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'

const Context = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'contexts',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Context
