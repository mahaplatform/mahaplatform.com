const FixCouponPercent = {

  up: async (knex) => {

    await knex.schema.table('finance_coupons', (table) => {
      table.dropColumn('percent')
    })

    await knex.schema.table('finance_coupons', (table) => {
      table.decimal('percent', 5, 4)
    })

    await knex.schema.table('finance_invoices', (table) => {
      table.decimal('discount_amount', 5, 2)
      table.decimal('discount_percent', 5, 4)
    })


  },

  down: async (knex) => {
  }

}

export default FixCouponPercent
