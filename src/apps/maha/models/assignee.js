import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const Assignee = new Model(knex, {

  databaseName: 'maha',

  tableName: 'maha_assignees'

})

export default Assignee
