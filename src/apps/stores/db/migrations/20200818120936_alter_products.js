const AlterProducts = {

  up: async (knex) => {

    await knex.schema.table('stores_products', (table) => {
      table.enum('type', ['physical','file','url'], { useNative: true, enumName: 'stores_product_types' })
    })

    await knex.schema.table('stores_variants', (table) => {
      table.enum('shipping_strategy', ['free','flat'], { useNative: true, enumName: 'stores_product_shipping_strategies' })
      table.decimal('shipping_fee', 6, 2)
      table.integer('file_id').unsigned()
      table.foreign('file_id').references('maha_assets.id')
      table.string('url')
    })

    await knex.schema.table('stores_orders', (table) => {
      table.jsonb('shipping_address')
    })

  },

  down: async (knex) => {
  }

}

export default AlterProducts
