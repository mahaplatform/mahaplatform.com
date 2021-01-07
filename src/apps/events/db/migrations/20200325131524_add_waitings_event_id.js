const AddWaitingsEventId = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('events_waitings', (table) => {
      table.integer('event_id').unsigned()
      table.foreign('event_id').references('events_events.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddWaitingsEventId
