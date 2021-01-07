const AddTicketType = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('events_tickets', (table) => {
      table.integer('ticket_type_id').unsigned()
      table.foreign('ticket_type_id').references('events_ticket_types.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddTicketType
