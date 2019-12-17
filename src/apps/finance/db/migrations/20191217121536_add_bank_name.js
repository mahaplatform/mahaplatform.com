const AddBankName = {

  up: async (knex) => {

    await knex.schema.table('finance_payment_methods', (table) => {
      table.string('bank_name')
    })

    await knex.raw(`
      create or replace view finance_payment_details as
      select finance_payments.id as payment_id,
      case
      when finance_payments.method='scholarship' then null
      when finance_payments.method='credit' then null
      when finance_payments.method='cash' then null
      when finance_payments.method='check' then concat('#',finance_payments.reference)
      when finance_payments.method='paypal' then finance_payment_methods.email
      when finance_payments.method='ach' then concat(finance_payment_methods.bank_name,'-',finance_payment_methods.last_four)
      else upper(concat(finance_payment_methods.card_type,'-',finance_payment_methods.last_four))
      end as description
      from finance_payments
      left join finance_payment_methods on finance_payment_methods.id = finance_payments.payment_method_id
    `)

  },

  down: async (knex) => {
  }

}

export default AddBankName
