const AddNameToTickets = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('events_tickets', (table) => {
      table.string('first_name')
      table.string('last_name')
      table.string('email')
    })

  },

  down: async (knex) => {
  }

}

export default AddNameToTickets
