const CreateContent = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('contents', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('contents')
  }

}

export default CreateContent
