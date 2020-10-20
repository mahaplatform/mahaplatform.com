const CreateAdjustments = {

  up: async (knex) => {

    await knex.schema.table('stores_orders', (table) => {
      table.dropColumn('cart_id')
    })

    await knex.schema.createTable('stores_adjustments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('variant_id').unsigned()
      table.foreign('variant_id').references('stores_variants.id')
      table.integer('quantity')
      table.timestamps()
    })

    const variants = await knex('stores_variants')

    await Promise.mapSeries(variants, async (variant) => {
      if(variant.inventory_quantity === null) return
      await knex('stores_adjustments').insert({
        team_id: variant.team_id,
        variant_id: variant.id,
        quantity: variant.inventory_quantity,
        created_at: variant.created_at,
        updated_at: variant.updated_at
      })
    })

    await knex.schema.table('stores_variants', (table) => {
      table.dropColumn('inventory_quantity')
    })

  },

  down: async (knex) => {
  }

}

export default CreateAdjustments
