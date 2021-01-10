const CreateRaw = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('raws', (table) => {
      table.increments('id').primary()
      table.text('data')
      table.enum('status', ['pending','processed','failed'], { useNative: true, enumName: 'raw_statuses' })
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('raws')
  }

}

export default CreateRaw
