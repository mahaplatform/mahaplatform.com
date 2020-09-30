const AlterStores = {

  up: async (knex) => {

    await knex.schema.dropTable('stores_options')

    await knex.schema.table('stores_products', (table) => {
      table.dropColumn('base_variant_id')
    })

  },

  down: async (knex) => {
  }

}

export default AlterStores
