import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Apikey = new Model(knex, {

  databaseName: 'maha',

  tableName: 'datasets_apikeys',

  rules: {},

  virtuals: {}

})

export default Apikey
