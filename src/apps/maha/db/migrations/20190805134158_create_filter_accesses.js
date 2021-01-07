const CreateFilterAccess = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_filter_accesses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('filter_id').unsigned()
      table.foreign('filter_id').references('maha_filters.id')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('maha_groups.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_filter_accesses')
  }

}

export default CreateFilterAccess
