const CreateWorkflowStep = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('crm_workflow_steps', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('workflow_id').unsigned()
      table.foreign('workflow_id').references('crm_workflows.id')
      table.enum('type', ['action','conditional','goal'], { useNative: true, enumName: 'crm_workflow_step_types' })
      table.string('action')
      table.string('code')
      table.string('parent')
      table.string('answer')
      table.integer('delta')
      table.jsonb('config')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_workflow_steps')
  }

}

export default CreateWorkflowStep
