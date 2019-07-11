const CreateFulfillment = {

  up: async (knex) => {
    await knex.schema.createTable('training_fulfillments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('assignment_id').unsigned()
      table.foreign('assignment_id').references('training_assignments.id')
      table.integer('training_id').unsigned()
      table.foreign('training_id').references('training_trainings.id')
      table.integer('offering_id').unsigned()
      table.foreign('offering_id').references('training_offerings.id')
      table.text('feedback')
      table.timestamp('completed_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('training_fulfillments')
  }

}

export default CreateFulfillment
