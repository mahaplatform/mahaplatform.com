const CreateDashboardCardType = {

  up: async (knex) => {
    await knex.schema.createTable('maha_dashboard_card_types', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('maha_apps.id')
      table.string('code')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_dashboard_card_types')
  }

}

export default CreateDashboardCardType
