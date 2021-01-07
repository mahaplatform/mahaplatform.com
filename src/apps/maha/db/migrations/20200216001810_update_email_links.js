const UpdateEmailLinks = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('maha_email_links', (table) => {
      table.text('url').alter()
      table.text('text').alter()
    })
  },

  down: async (knex) => {
  }

}

export default UpdateEmailLinks
