const CreatePage = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('pages', (table) => {
      table.increments('id').primary()
      table.string('title')
      table.integer('protocol_id').unsigned()
      table.foreign('protocol_id').references('protocols.id')
      table.integer('domain_id').unsigned()
      table.foreign('domain_id').references('domains.id')
      table.string('path')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('pages')
  }

}

export default CreatePage
