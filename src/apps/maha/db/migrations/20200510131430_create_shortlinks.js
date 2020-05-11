const CreateShortlink = {

  up: async (knex) => {
    await knex.schema.createTable('maha_shortlinks', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('code')
      table.text('url')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_shortlinks')
  }

}

export default CreateShortlink
