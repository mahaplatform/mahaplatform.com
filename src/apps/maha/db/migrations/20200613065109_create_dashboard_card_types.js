const CreateDashboardCardType = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('maha_dashboard_card_types', (table) => {
      table.increments('id').primary()
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('maha_apps.id')
      table.string('code')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('maha_dashboard_card_types')
  }

}

export default CreateDashboardCardType
