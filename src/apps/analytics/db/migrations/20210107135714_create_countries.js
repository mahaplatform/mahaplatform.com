const CreateCountry = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('countries', (table) => {
      table.increments('id').primary
      table.string('code')
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('countries')
  }

}

export default CreateCountry
