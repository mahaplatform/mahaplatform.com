const CreateOrganizer = {

  up: async (knex) => {

    await knex.schema.createTable('events_organizers', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('maha_assets.id')
      table.string('name')
      table.string('email')
      table.string('phone')
      table.timestamps()
    })

    await knex.schema.createTable('events_events_organizers', (table) => {
      table.integer('event_id').unsigned()
      table.foreign('event_id').references('events_events.id')
      table.integer('organizer_id').unsigned()
      table.foreign('organizer_id').references('events_organizers.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('events_organizers')
  }

}

export default CreateOrganizer
