const CreatePage = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('websites_pages', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('website_id').unsigned()
      table.foreign('website_id').references('websites_websites.id')
      table.string('title')
      table.string('code')
      table.timestamp('deleted_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('websites_pages')
  }

}

export default CreatePage
