const Training = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('training_trainings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title')
      table.text('description')
      table.enum('type', ['local','remote','online','maha'])
      table.string('url')
      table.string('location')
      table.string('contact')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('training_answerings')
  }

}

export default Training
