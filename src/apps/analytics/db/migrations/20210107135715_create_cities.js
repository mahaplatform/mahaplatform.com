const CreateCity = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('cities', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('cities')
  }

}

export default CreateCity
