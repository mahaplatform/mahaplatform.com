const CreateDashboardPanel = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_dashboard_panels', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('owner_id').unsigned()
      table.foreign('owner_id').references('maha_users.id')
      table.string('title')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_dashboard_panels')
  }

}

export default CreateDashboardPanel
