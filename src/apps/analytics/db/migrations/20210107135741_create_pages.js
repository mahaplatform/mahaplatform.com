const CreatePage = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('pages', (table) => {
      table.increments('id').primary()
      table.integer('domain_id').unsigned()
      table.foreign('domain_id').references('domains.id')
      table.string('title')
      table.string('url')
      table.string('path')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('pages')
  }

}

export default CreatePage
