const CreateProductSlugs = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('stores_products', (table) => {
      table.string('slug')
    })

    const products = await knex('stores_products')

    await Promise.mapSeries(products, async (product) => {
      await knex('stores_products').where({
        id: product.id
      }).update({
        slug: product.title.replace(/[^A-Za-z0-9\s]+/g, '').replace(/[\s]+/g, '-').toLowerCase()
      })
    })

  },

  down: async (knex) => {
  }

}

export default CreateProductSlugs
