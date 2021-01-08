const CreateSource = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('sources', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('sources')
  }

}

export default CreateSource
