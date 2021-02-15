const WorkflowConfigs = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_workflows', (table) => {
      table.jsonb('config')
    })
  },

  down: async (knex) => {
  }

}

export default WorkflowConfigs
