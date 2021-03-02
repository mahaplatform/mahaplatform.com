import knex from '@core/vendor/knex/maha'
import Model from '@core/objects/model'

const WorkflowResult = new Model(knex, {

  databaseName: 'maha',

  tableName: 'crm_workflow_results',

  rules: {},

  virtuals: {}

})

export default WorkflowResult
