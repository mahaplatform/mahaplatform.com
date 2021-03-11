const CreateWebsite = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('websites_websites', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('favicon_id').unsigned()
      table.foreign('favicon_id').references('maha_assets.id')
      table.string('title')
      table.string('code')
      table.jsonb('config')
      table.timestamp('deleted_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('websites_websites')
  }

}

export default CreateWebsite
