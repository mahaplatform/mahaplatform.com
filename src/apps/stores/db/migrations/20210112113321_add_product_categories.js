const AddProductCategories = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('stores_products_categories', (table) => {
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('stores_products.id')
      table.integer('category_id').unsigned()
      table.foreign('category_id').references('stores_categories.id')
    })

    const products = await knex('stores_products')

    await Promise.mapSeries(products, async(product) => {
      await knex('stores_products_categories').insert({
        product_id: product.id,
        category_id: product.category_id
      })
    })

    await knex.schema.table('stores_products', (table) => {
      table.dropColumn('category_id')
    })

  },

  down: async (knex) => {
  }

}

export default AddProductCategories
