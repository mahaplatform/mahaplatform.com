const CreateDashboardPageAccess = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_dashboard_panel_accesses', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('panel_id').unsigned()
      table.foreign('panel_id').references('maha_dashboard_panels.id')
      table.integer('grouping_id').unsigned()
      table.foreign('grouping_id').references('maha_groupings.id')
      table.integer('group_id').unsigned()
      table.foreign('group_id').references('maha_groups.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('maha_users.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_dashboard_panel_accesses')
  }

}

export default CreateDashboardPageAccess
