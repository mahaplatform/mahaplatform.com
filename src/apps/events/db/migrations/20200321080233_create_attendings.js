const CreateAttending = {

  up: async (knex) => {
    await knex.schema.createTable('events_attendings', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('ticket_id').unsigned()
      table.foreign('ticket_id').references('events_tickets.id')
      table.integer('session_id').unsigned()
      table.foreign('session_id').references('events_sessions.id')
      table.enum('method', ['manual','scan'], { useNative: true, enumName: 'events_attendings_method' })
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('events_attendings')
  }

}

export default CreateAttending
