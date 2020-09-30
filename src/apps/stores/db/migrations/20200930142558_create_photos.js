const CreatePhoto = {

  up: async (knex) => {

    await knex.schema.table('stores_media', (table) => {
      table.dropColumn('video')
    })

    await knex.schema.renameTable('stores_media', 'stores_photos')

  },

  down: async (knex) => {
    await knex.schema.dropTable('stores_photos')
  }

}

export default CreatePhoto
