import Model from '@core/objects/model'
import knex from '@core/vendor/knex/analytics'

const Useragent = new Model(knex, {

  databaseName: 'analytics',

  tableName: 'useragents',

  hasTimestamps: false,

  rules: {},

  virtuals: {}

})

export default Useragent
