const CreateAction = {

  up: async (knex) => {
    await knex.schema.createTable('crm_actions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('enrollment_id').unsigned()
      table.foreign('enrollment_id').references('crm_enrollments.id')
      table.integer('step_id').unsigned()
      table.foreign('step_id').references('crm_steps.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('crm_actions')
  }

}

export default CreateAction
