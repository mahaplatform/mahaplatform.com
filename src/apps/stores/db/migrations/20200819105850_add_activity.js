const AddActivity = {

  up: async (knex) => {

    await knex.schema.table('stores_products', (table) => {
      table.boolean('is_active')
      table.timestamp('deleted_at')
    })

    await knex.schema.table('stores_variants', (table) => {
      table.boolean('is_active')
      table.timestamp('deleted_at')
    })

  },

  down: async (knex) => {
  }

}

export default AddActivity
