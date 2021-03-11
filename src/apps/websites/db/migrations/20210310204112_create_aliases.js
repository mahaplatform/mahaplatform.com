const CreateAlias = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('websites_aliases', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('website_id').unsigned()
      table.foreign('website_id').references('websites_websites.id')
      table.integer('page_id').unsigned()
      table.foreign('page_id').references('websites_pages.id')
      table.string('path')
      table.boolean('is_primary')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('websites_aliases')
  }

}

export default CreateAlias
