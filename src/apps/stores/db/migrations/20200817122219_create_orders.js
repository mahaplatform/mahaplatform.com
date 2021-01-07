const CreateOrder = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('stores_orders', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('store_id').unsigned()
      table.foreign('store_id').references('stores_stores.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('cart_id').unsigned()
      table.foreign('cart_id').references('stores_carts.id')
      table.integer('invoice_id').unsigned()
      table.foreign('invoice_id').references('finance_invoices.id')
      table.integer('payment_id').unsigned()
      table.foreign('payment_id').references('finance_payments.id')
      table.string('ipaddress')
      table.text('referer')
      table.integer('duration')
      table.boolean('is_known')
      table.jsonb('data')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('stores_orders')
  }

}

export default CreateOrder
