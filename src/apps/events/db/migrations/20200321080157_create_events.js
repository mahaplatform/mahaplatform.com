const CreateEvent = {

  up: async (knex) => {
    await knex.schema.createTable('events_events', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.string('title')
      table.text('description')
      table.jsonb('config')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('events_events')
  }

}

export default CreateEvent
