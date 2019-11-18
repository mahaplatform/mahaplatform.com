const CreatePayment = {

  up: async (knex) => {
    await knex.schema.createTable('expenses_payments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('invoice_id').unsigned()
      table.foreign('invoice_id').references('expenses_invoices.id')
      table.integer('credit_id').unsigned()
      table.foreign('credit_id').references('expenses_credits.id')
      table.integer('scholarship_id').unsigned()
      table.foreign('scholarship_id').references('expenses_scholarships.id')
      table.integer('merchant_id').unsigned()
      table.foreign('merchant_id').references('expenses_merchants.id')
      table.enum('method', ['credit','scholarship','card','ach','applepay','googlepay','paypal'], { useNative: true, enumName: 'expenses_payments_method' })
      table.decimal('amount', 6, 2)
      table.enum('status', ['captured','settled','disbursed'], { useNative: true, enumName: 'expenses_payments_status' })
      table.string('braintree_id')
      table.timestamp('voided_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('expenses_payments')
  }

}

export default CreatePayment
