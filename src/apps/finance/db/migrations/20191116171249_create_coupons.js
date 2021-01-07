const CreateCoupon = {

  databaseName: 'maha',

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

    await knex.schema.createTable('finance_coupons_products', (table) => {
      table.integer('coupon_id').unsigned()
      table.foreign('coupon_id').references('finance_coupons.id')
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('finance_products.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('finance_coupons')
  }

}

export default CreateCoupon
