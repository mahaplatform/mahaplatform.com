const CreateContext = {

  databaseName: 'analytics',

  up: async (knex) => {

    await knex.schema.createTable('contexts', (table) => {
      table.increments('id').primary()
      table.string('context_id')
    })

    await knex.schema.table('events', (table) => {
      table.integer('context_id').unsigned()
      table.foreign('context_id').references('contexts.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('contexts')
  }

}

export default CreateContext
