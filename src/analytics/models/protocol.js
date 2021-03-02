import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'

const Protocol = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'protocols',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Protocol
