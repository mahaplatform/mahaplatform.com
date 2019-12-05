const Memorialization = {

  up: async (knex) => {

    await knex.schema.table('finance_line_items', (table) => {
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('finance_projects.id')
      table.integer('revenue_type_id').unsigned()
      table.foreign('revenue_type_id').references('finance_revenue_types.id')
    })

    await knex.schema.table('finance_payments', (table) => {
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('maha_assets.id')
    })

  },

  down: async (knex) => {
  }

}

export default Memorialization
