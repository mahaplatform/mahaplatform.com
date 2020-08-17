const CreateOrder = {

  up: async (knex) => {
    await knex.schema.createTable('stores_orders', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('store_id').unsigned()
      table.foreign('store_id').references('stores_stores.id')
      table.integer('customer_id').unsigned()
      table.foreign('customer_id').references('crm_contacts.id')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('orders')
  }

}

export default CreateOrder
