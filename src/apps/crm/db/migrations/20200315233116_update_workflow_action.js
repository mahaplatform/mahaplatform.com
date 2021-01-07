const UpdateWorkflowAction = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_workflow_actions', (table) => {
      table.jsonb('data')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateWorkflowAction
