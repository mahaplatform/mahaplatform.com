const CreateOption = {

  up: async (knex) => {

    await knex.schema.createTable('training_options', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('assigning_id').unsigned()
      table.foreign('assigning_id').references('training_assignings.id')
      table.timestamps()
    })

    await knex.schema.createTable('training_options_trainings', (table) => {
      table.integer('option_id').unsigned()
      table.foreign('option_id').references('training_options.id')
      table.integer('training_id').unsigned()
      table.foreign('training_id').references('training_trainings.id')
    })

  },

  down: async (knex) => {

    await knex.schema.dropTable('training_options')

    await knex.schema.dropTable('training_options_trainings')

  }

}

export default CreateOption
