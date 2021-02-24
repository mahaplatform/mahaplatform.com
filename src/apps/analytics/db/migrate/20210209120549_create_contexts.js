const CreateContext = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.createTable('contexts', (table) => {
      table.increments('id').primary()
      table.string('context_id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('contexts')
  }

}

export default CreateContext
