const CreateAssignees = {

  databaseName: 'maha',

  up: async (knex) => {

    return await knex.schema.createTable('maha_sessions', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('device_id').unsigned()
      table.foreign('device_id').references('maha_devices.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.timestamp('last_active_at')
      table.timestamps()
    })

  },

  down: async (knex) => {
    return await knex.schema.dropTable('maha_sessions')
  }

}

export default CreateAssignees
