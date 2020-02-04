const UpdateWorkflows = {

  up: async (knex) => {
    await knex.schema.table('crm_workflows', (table) => {
      table.dropColumn('steps')
      table.jsonb('config')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateWorkflows
