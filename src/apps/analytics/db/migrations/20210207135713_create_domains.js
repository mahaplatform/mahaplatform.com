const CreateDomain = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('domains', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('domains')
  }

}

export default CreateDomain
