const CreateApp = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('apps', (table) => {
      table.increments('id').primary()
      table.integer('platform_id').unsigned()
      table.foreign('platform_id').references('platforms.id')
      table.string('title')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('apps')
  }

}

export default CreateApp
