const CreateProperty = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('properties', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('properties')
  }

}

export default CreateProperty
