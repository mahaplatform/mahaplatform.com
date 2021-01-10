const CreateProtocol = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('protocols', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('protocols')
  }

}

export default CreateProtocol
