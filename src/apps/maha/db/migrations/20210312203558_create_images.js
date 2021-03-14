const CreateImage = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_images', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
      table.jsonb('transforms')
      table.jsonb('attributions')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_images')
  }

}

export default CreateImage
