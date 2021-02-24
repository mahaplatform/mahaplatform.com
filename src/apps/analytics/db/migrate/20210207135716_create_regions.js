const CreateRegion = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('regions', (table) => {
      table.increments('id').primary()
      table.string('code')
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('regions')
  }

}

export default CreateRegion
