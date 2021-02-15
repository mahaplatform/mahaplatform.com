const WorkflowConfigs = {

  databaseName: 'maha',

  up: async (knex) => {
    await Promise.mapSeries(['crm_workflows','maha_phone_numbers'], async (table) => {
      await knex.schema.table(table, (t) => {
        t.jsonb('config')
      })
    })
  },

  down: async (knex) => {
  }

}

export default WorkflowConfigs
