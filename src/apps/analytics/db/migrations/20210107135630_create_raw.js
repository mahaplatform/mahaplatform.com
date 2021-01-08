const CreateRaw = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('raw', (table) => {
      table.increments('id').primary()
      table.enum('status', ['bad','enriched','processed'], { useNative: true, enumName: 'raw_statuses' })
      table.jsonb('data')
      table.jsonb('errors')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('raw')
  }

}

export default CreateRaw
