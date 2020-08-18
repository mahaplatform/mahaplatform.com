const AlterVariants = {

  up: async (knex) => {

    await knex.schema.table('stores_variants', (table) => {
      table.dropColumn('options')
    })

    await knex.schema.table('stores_variants', (table) => {
      table.integer('max_per_order')
      table.specificType('options', 'jsonb[]')
      table.string('code')
    })

  },

  down: async (knex) => {
  }

}

export default AlterVariants
