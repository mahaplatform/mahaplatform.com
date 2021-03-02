const CreateBrowser = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('browsers', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('browsers')
  }

}

export default CreateBrowser
