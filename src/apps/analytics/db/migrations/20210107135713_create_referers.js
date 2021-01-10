const CreateReferer = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('referers', (table) => {
      table.increments('id').primary()
      table.integer('protocol_id').unsigned()
      table.foreign('protocol_id').references('protocols.id')
      table.integer('domain_id').unsigned()
      table.foreign('domain_id').references('domains.id')
      table.string('path')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('referers')
  }

}

export default CreateReferer
