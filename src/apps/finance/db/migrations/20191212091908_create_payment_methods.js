const CreatePaymentMethod = {

  up: async (knex) => {
    await knex.schema.createTable('finance_payment_methods', (table) => {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('maha_teams.id')
      table.integer('customer_id').unsigned()
      table.foreign('customer_id').references('crm_contacts.id')
      table.enum('method', ['applepay','googlepay','card','ach'], { useNative: true, enumName: 'finance_payment_methods_method' })
      table.enum('card_type', ['visa','mastercard','discover','amex','jcb'], { useNative: true, enumName: 'finance_payment_methods_type' })
      table.enum('account_type', ['checking','savings'], { useNative: true, enumName: 'finance_payment_methods_bank_account_type' })
      table.enum('ownership_type', ['personal','business'], { useNative: true, enumName: 'finance_payment_methods_ownership_type' })
      table.string('email')
      table.string('last_four')
      table.string('expiration_month')
      table.string('expiration_year')
      table.string('braintree_id')
      table.timestamps()
    })

    await knex.schema.table('finance_payments', (table) => {
      table.dropColumn('card_id')
      table.integer('payment_method_id').unsigned()
      table.foreign('payment_method_id').references('finance_payment_methods.id')
    })

    await knex.schema.dropTable('finance_cards')

    await knex.raw(`
      create view finance_payment_details as
      select finance_payments.id as payment_id,
      case
      when finance_payments.method='cash' then null
      when finance_payments.method='check' then concat('#',finance_payments.reference)
      when finance_payments.method='paypal' then finance_payment_methods.email
      else upper(concat(finance_payment_methods.card_type,'-',finance_payment_methods.last_four))
      end as description
      from finance_payments
      left join finance_payment_methods on finance_payment_methods.id = finance_payments.payment_method_id
    `)

  },

  down: async (knex) => {
    await knex.schema.dropTable('finance_payment_methods')
  }

}

export default CreatePaymentMethod
