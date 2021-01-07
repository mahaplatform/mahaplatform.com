const CreateDiscount = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('stores_discounts', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('store_id').unsigned()
      table.foreign('store_id').references('stores_stores.id')
      table.string('code')
      table.enum('type', ['percent','amount'], { useNative: true, enumName: 'stores_discount_types' })
      table.decimal('amount', 6, 2)
      table.decimal('percent', 3, 2)
      table.enum('applies_to', ['order','variant'], { useNative: true, enumName: 'stores_discount_applies_tos' })
      table.bool('applies_once')
      table.enum('minimum_requirements', ['none','amount','quantity'], { useNative: true, enumName: 'stores_discount_minimum_requirements' })
      table.decimal('minimum_amount', 6, 2)
      table.integer('minimum_quantity')
      table.timestamp('starts_at')
      table.timestamp('ends_at')
      table.timestamps()
    })

    await knex.schema.createTable('stores_discounts_variants', (table) => {
      table.integer('discount_id').unsigned()
      table.foreign('discount_id').references('stores_discounts.id')
      table.integer('variant_id').unsigned()
      table.foreign('variant_id').references('stores_variants.id')
    })

    await knex.schema.table('stores_orders', (table) => {
      table.integer('discount_id').unsigned()
      table.foreign('discount_id').references('stores_discounts.id')
    })

    await knex.schema.table('stores_carts', (table) => {
      table.integer('discount_id').unsigned()
      table.foreign('discount_id').references('stores_discounts.id')
    })

  },

  down: async (knex) => {
    await knex.schema.dropTable('stores_discounts')
  }

}

export default CreateDiscount
