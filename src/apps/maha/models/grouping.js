import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Grouping = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_groupings',

  rules: {},

  virtuals: {}

})

export default Grouping
