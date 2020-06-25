const CreateMedia = {

  up: async (knex) => {
    await knex.schema.createTable('media', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('stores_products.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.integer('delta')
      table.jsonb('video')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('media')
  }

}

export default CreateMedia
