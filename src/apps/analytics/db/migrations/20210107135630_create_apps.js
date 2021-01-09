const CreateApp = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('apps', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('platform')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('apps')
  }

}

export default CreateApp
