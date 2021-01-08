const CreatePage = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('pages', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.string('url')
      table.enum('scheme', ['http','https'], { useNative: true, enumName: 'page_schemes' })
      table.string('host')
      table.string('path')
      table.string('query')
      table.string('fragment')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('pages')
  }

}

export default CreatePage
