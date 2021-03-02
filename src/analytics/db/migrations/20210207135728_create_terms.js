const CreateTerm = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('terms', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('terms')
  }

}

export default CreateTerm
