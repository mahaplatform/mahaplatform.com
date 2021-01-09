const CreateNetwork = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('networks', (table) => {
      table.increments('id').primary()
      table.string('text')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('networks')
  }

}

export default CreateNetwork
