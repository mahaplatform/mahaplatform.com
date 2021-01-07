const CreateTicket = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('events_tickets', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('registration_id').unsigned()
      table.foreign('registration_id').references('events_registrations.id')
      table.string('code')
      table.jsonb('values')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('events_tickets')
  }

}

export default CreateTicket
