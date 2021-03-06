const CreatePayment = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.createTable('finance_payments', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('contact_id').unsigned()
      table.foreign('contact_id').references('crm_contacts.id')
      table.integer('invoice_id').unsigned()
      table.foreign('invoice_id').references('finance_invoices.id')
      table.integer('credit_id').unsigned()
      table.foreign('credit_id').references('finance_credits.id')
      table.integer('scholarship_id').unsigned()
      table.foreign('scholarship_id').references('finance_scholarships.id')
      table.integer('merchant_id').unsigned()
      table.foreign('merchant_id').references('finance_merchants.id')
      table.integer('disbursement_id').unsigned()
      table.foreign('disbursement_id').references('finance_disbursements.id')
      table.enum('method', ['cash','check','credit','scholarship','card','ach','applepay','googlepay','paypal'], { useNative: true, enumName: 'finance_payments_method' })
      table.enum('status', ['captured','settled','deposited'], { useNative: true, enumName: 'finance_payments_status' })
      table.enum('card_type', ['visa','mastercard','discover','amex','jcb'], { useNative: true, enumName: 'finance_payments_card_type' })
      table.decimal('amount', 6, 2)
      table.decimal('fee', 6, 2)
      table.string('reference')
      table.string('braintree_id')
      table.timestamp('voided_at')
      table.timestamps()
    })
  },

  down: async (knex) => {
    await knex.schema.dropTable('finance_payments')
  }

}

export default CreatePayment
