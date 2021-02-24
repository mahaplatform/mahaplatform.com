const CreateEvent = {

  databaseName: 'analytics',

  up: async (knex) => {
    await knex.schema.createTable('events', (table) => {
      table.increments('id').primary()
      table.integer('session_id').unsigned()
      table.foreign('session_id').references('sessions.id')
      table.integer('event_type_id').unsigned()
      table.foreign('event_type_id').references('event_types.id')
      table.integer('page_id').unsigned()
      table.foreign('page_id').references('pages.id')
      table.integer('context_id')
      table.string('event_id')
      table.integer('doc_width')
      table.integer('doc_height')
      table.integer('view_width')
      table.integer('view_height')
      table.jsonb('data')
      table.timestamp('tstamp')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('events')
  }

}

export default CreateEvent
