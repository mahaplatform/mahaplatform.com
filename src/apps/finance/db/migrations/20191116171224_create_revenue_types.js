const CreateRevenueType = {

  up: async (knex) => {
    await knex.schema.createTable('finance_revenue_types', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('title', 255)
      table.jsonb('integration')
      table.text('description')
      table.boolean('is_active').defaultsTo(false)
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('finance_revenue_types')
  }

}

export default CreateRevenueType
