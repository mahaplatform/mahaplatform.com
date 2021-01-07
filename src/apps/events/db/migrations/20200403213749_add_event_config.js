const AddEventConfig = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('events_events', (table) => {
      table.dropColumn('config')
      table.string('permalink')
      table.jsonb('contact_config')
      table.jsonb('ticket_config')
      table.jsonb('payment_config')
    })
  },

  down: async (knex) => {
  }

}

export default AddEventConfig
