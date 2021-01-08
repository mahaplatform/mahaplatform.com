const CreateEventType = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('event_types', (table) => {
      table.increments('id').primary()
      table.string('type')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('event_types')
  }

}

export default CreateEventType
