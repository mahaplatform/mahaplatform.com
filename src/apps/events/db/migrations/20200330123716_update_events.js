const UpdateEvents = {

  up: async (knex) => {

    await knex.schema.table('events_events', (table) => {
      table.integer('image_id').unsigned()
      table.foreign('image_id').references('maha_assets.id')
    })

    await knex.schema.table('events_sessions', (table) => {
      table.boolean('is_online')
    })

  },

  down: async (knex) => {
  }

}

export default UpdateEvents
