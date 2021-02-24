const CreatePostalCode = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('postal_codes', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('postal_codes')
  }

}

export default CreatePostalCode
