const CreateItem = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('stores_items', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('order_id').unsigned()
      table.foreign('order_id').references('stores_orders.id')
      table.integer('variant_id').unsigned()
      table.foreign('variant_id').references('stores_variants.id')
      table.enum('status', ['pending','fulfilled'], { useNative: true, enumName: 'stores_item_statuses' })
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('stores_items')
  }

}

export default CreateItem
