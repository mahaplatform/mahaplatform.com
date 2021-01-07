const CreateNumber = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_numbers', (table) => {
      table.increments('id').primary()
      table.string('number')
      table.string('name')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_numbers')
  }

}

export default CreateNumber
