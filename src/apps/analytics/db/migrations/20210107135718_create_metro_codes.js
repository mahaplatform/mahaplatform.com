const CreateMetroCode = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('metro_codes', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('metro_codes')
  }

}

export default CreateMetroCode
