const CreateItems = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('sites_domains', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('site_id').unsigned()
      table.foreign('site_id').references('sites_sites.id')
      table.string('name')
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('sites_domains')
  }

}

export default CreateItems
