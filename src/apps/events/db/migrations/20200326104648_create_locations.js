const CreateLocation = {

  up: async (knex) => {

    await knex.schema.createTable('events_locations', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('name')
      table.jsonb('address')
      table.timestamps()
    })

    await knex.schema.table('events_sessions', (table) => {
      table.integer('location_id').unsigned()
      table.foreign('location_id').references('events_locations.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('events_locations')
  }

}

export default CreateLocation
