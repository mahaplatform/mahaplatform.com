const Training = {

  up: async (knex) => {
    return await knex.schema.createTable('learning_trainings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.text('description')
      table.enum('type', ['local','remote','managed'])
      table.string('url')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('learning_answerings')
  }

}

export default Training
