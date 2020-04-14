const UpdateEvent = {

  up: async (knex) => {
    await knex.schema.table('events_events', (table) => {
      table.timestamp('deleted_at')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateEvent
