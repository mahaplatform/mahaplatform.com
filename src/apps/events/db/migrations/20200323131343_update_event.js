const UpdateEvent = {

  up: async (knex) => {
    await knex.schema.table('events_events', (table) => {
      table.string('code')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateEvent
