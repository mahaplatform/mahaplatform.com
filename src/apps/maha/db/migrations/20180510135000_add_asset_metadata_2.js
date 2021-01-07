const AddAssetMetadata2 = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_assets', (table) => {
      table.string('source_identifier')
      table.text('source_url')
    })

  },

  down: async (knex) => {}

}

export default AddAssetMetadata2
