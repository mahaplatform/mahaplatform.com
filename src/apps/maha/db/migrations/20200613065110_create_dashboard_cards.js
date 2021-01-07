const CreateDashboardCard = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_dashboard_cards', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('panel_id').unsigned()
      table.foreign('panel_id').references('maha_dashboard_panels.id')
      table.integer('type_id').unsigned()
      table.foreign('type_id').references('maha_dashboard_card_types.id')
      table.integer('delta')
      table.jsonb('config')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_dashboard_cards')
  }

}

export default CreateDashboardCard
