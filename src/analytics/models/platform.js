import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'

const Platform = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'platforms',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Platform
