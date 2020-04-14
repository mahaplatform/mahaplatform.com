const UpdateTicketTypes = {

  up: async (knex) => {
    await knex.schema.table('events_ticket_types', (table) => {
      table.text('description')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateTicketTypes
