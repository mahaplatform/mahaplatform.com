const FixStoreMedia = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.dropTable('media')
    await knex.schema.createTable('stores_media', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('variant_id').unsigned()
      table.foreign('variant_id').references('stores_variants.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.integer('delta')
      table.jsonb('video')
      table.timestamps()
    })
  },

  down: async (knex) => {
  }

}

export default FixStoreMedia
