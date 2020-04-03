const UpdateTicket = {

  up: async (knex) => {
    await knex.schema.table('events_tickets', (table) => {
      table.dropColumn('first_name')
      table.dropColumn('last_name')
      table.dropColumn('email')
      table.string('name')
    })
  },

  down: async (knex) => {
  }

}

export default UpdateTicket
