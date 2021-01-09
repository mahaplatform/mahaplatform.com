const CreateManufacturer = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('manufacturers', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('manufacturers')
  }

}

export default CreateManufacturer
