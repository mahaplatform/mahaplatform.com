const Training = {

  up: async (knex) => {
    return await knex.schema.createTable('learning_trainings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('learning_trainings.id')
      table.string('title')
      table.string('description')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('learning_answerings')
  }

}

export default Training
