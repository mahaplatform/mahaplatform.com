const AddEventConfig = {

  up: async (knex) => {
    await knex.schema.table('events_events', (table) => {
      table.string('permalink')
      table.jsonb('contact_config')
      table.jsonb('ticket_config')
    })
  },

  down: async (knex) => {
  }

}

export default AddEventConfig
