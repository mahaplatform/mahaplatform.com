const AddCaptions = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('maha_attachments', (table) => {
      table.string('caption')
    })

  },

  down: async (knex) => {

    await knex.schema.table('maha_attachments', (table) => {
      table.dropColumn('caption')
    })

  }

}

export default AddCaptions
