const CreateStars = {

  databaseName: 'maha',

  up: async (knex) => {
    return await knex.schema.createTable('maha_stars', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.string('starrable_type')
      table.integer('starrable_id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_stars')
  }

}

export default CreateStars
