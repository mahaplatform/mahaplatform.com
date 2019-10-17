const CreateWorkflow = {

  up: async (knex) => {
    await knex.schema.createTable('crm_workflows', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.enum('type', ['voice','sms'], { useNative: true, enumName: 'crm_workflows_type' })
      table.string('title')
      table.string('description')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_workflows')
  }

}

export default CreateWorkflow
