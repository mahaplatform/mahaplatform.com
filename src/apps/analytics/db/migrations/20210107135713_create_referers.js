const CreateReferer = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('referers', (table) => {
      table.increments('id').primary()
      table.string('url')
      table.enum('scheme', ['http','https'], { useNative: true, enumName: 'referers_schemes' })
      table.string('host')
      table.string('path')
      table.string('query')
      table.string('fragment')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('referers')
  }

}

export default CreateReferer
