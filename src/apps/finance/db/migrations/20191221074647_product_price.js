const ProductPrice = {

  up: async (knex) => {

    await knex.schema.table('finance_products', (table) => {
      table.dropColumn('price_type')
      table.dropColumn('fixed_price')
      table.dropColumn('low_price')
      table.dropColumn('high_price')
      table.decimal('price', 6, 2)
    })

  },

  down: async (knex) => {
  }

}

export default ProductPrice
