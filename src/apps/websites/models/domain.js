import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Domain = new Model(knex, {

  databaseName: 'maha',

  tableName: 'websites_domains',

  rules: {},

  virtuals: {}

})

export default Domain
