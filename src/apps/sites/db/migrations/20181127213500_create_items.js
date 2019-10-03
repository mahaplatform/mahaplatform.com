const CreateItems = {

  up: async (knex) => {

    await knex.schema.createTable('sites_items', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('site_id').unsigned()
      table.foreign('site_id').references('sites_sites.id')
      table.integer('type_id').unsigned()
      table.foreign('type_id').references('sites_types.id')
      table.jsonb('values')
      table.boolean('is_published').defaultsTo(false)
      table.timestamps()
    })
  },

  down: async (knex) => {
    return await knex.schema.dropTable('sites_items')
  }

}

export default CreateItems
