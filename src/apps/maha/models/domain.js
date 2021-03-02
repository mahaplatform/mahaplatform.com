import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Domain = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_domains',

  rules: {}

})

export default Domain
