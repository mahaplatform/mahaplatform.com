const AddAssetIdToResource = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('competencies_resources', table => {
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('maha_assets.id')
    })
  },

  down: async (knex) => {
    await knex.schema.table('competencies_resources', table => {
      table.dropColumn('asset_id')
    })
  }

}

export default AddAssetIdToResource
