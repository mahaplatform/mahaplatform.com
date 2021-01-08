const CreateEvent = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('events', (table) => {
      table.increments('id').primary()
      table.integer('raw_id').unsigned()
      table.foreign('raw_id').references('raw.id')
      table.integer('session_id').unsigned()
      table.foreign('session_id').references('sessions.id')
      table.integer('event_type_id').unsigned()
      table.foreign('event_type_id').references('event_types.id')
      table.integer('page_id').unsigned()
      table.foreign('page_id').references('pages.id')
      table.jsonb('context')
      table.timestamp('tstamp')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('events')
  }

}

export default CreateEvent
