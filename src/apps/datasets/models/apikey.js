import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Apikey = new Model(knex, {

  databaseName: 'maha',

  tableName: 'apikeys',

  rules: {},

  virtuals: {}

})

export default Apikey
