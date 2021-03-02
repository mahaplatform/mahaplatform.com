import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Feature = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_features',

  rules: {},

  virtuals: {}

})

export default Feature
