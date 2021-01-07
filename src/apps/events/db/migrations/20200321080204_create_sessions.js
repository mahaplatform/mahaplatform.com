const CreateSession = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('events_sessions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('event_id').unsigned()
      table.foreign('event_id').references('events_events.id')
      table.date('date')
      table.time('start_time')
      table.time('end_time')
      table.jsonb('location')
      table.string('title')
      table.text('description')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('events_sessions')
  }

}

export default CreateSession
