const CreateCoupon = {

  up: async (knex) => {
    await knex.schema.createTable('finance_coupons', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.string('code')
      table.decimal('amount', 5, 2)
      table.decimal('percent', 3, 0)
      table.integer('max_uses')
      table.boolean('is_active')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('finance_coupons')
  }

}

export default CreateCoupon
