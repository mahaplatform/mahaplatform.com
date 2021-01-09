const CreateCategory = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('categories', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('categories')
  }

}

export default CreateCategory
