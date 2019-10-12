const CreateNumber = {

  up: async (knex) => {
    await knex.schema.createTable('maha_numbers', (table) => {
      table.increments('id').primary()
      table.string('number')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_numbers')
  }

}

export default CreateNumber
