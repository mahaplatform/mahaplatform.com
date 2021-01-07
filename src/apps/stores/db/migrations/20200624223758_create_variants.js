const CreateVariant = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.createTable('stores_variants', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('stores_products.id')
      table.jsonb('options')
      table.enum('price_type', ['fixed','sliding_scale','free'], { useNative: true, enumName: 'store_variant_price_type' })
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('finance_projects.id')
      table.integer('revenue_type_id').unsigned()
      table.foreign('revenue_type_id').references('finance_revenue_types.id')
      table.decimal('fixed_price', 6, 2)
      table.decimal('low_price', 6, 2)
      table.decimal('high_price', 6, 2)
      table.decimal('tax_rate', 3, 2)
      table.enum('overage_strategy', ['income','donation'], { useNative: true, enumName: 'store_variant_overage_strategy' })
      table.integer('donation_revenue_type_id').unsigned()
      table.foreign('donation_revenue_type_id').references('finance_revenue_types.id')
      table.boolean('is_tax_deductable')
      table.integer('inventory_quantity')
      table.enum('inventory_policy', ['deny','continue'], { useNative: true, enumName: 'store_variant_inventory_policy' })
      table.timestamps()
    })

    await knex.schema.table('stores_products', (table) => {
      table.integer('base_variant_id').unsigned()
      table.foreign('base_variant_id').references('stores_variants.id')
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('stores_variants')
  }

}

export default CreateVariant
