const CreateWorkflowRecording = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('crm_workflow_recordings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('action_id').unsigned()
      table.foreign('action_id').references('crm_workflow_actions.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_workflow_recordings')
  }

}

export default CreateWorkflowRecording
