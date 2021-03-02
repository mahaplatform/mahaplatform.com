import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Alias = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_aliases',

  rules: {},

  virtuals: {}

})

export default Alias
