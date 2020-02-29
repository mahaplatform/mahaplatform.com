const CreateWorkflowStep = {

  up: async (knex) => {
    await knex.schema.createTable('crm_workflow_steps', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.string('code')
      table.jsonb('config')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_workflow_steps')
  }

}

export default CreateWorkflowStep
