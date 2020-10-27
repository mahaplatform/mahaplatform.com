const CreateUndeposited = {

  up: async (knex) => {

    await knex.raw(`
      create view finance_undeposited as
      select finance_payments.id,
      finance_payments.team_id,
      finance_payments.invoice_id,
      'payment' as type,
      finance_payments.method,
      date(finance_payments.date),
      finance_payment_details.disbursed as amount,
      finance_payments.created_at
      from finance_payments
      inner join finance_payment_details on finance_payment_details.payment_id=finance_payments.id
      where finance_payments.method in ('check','paypal','cash')
      and finance_payments.deposit_id is null
      union
      select finance_refunds.id,
      finance_refunds.team_id,
      finance_payments.invoice_id,
      'refund' as type,
      finance_payments.method,
      date(finance_refunds.created_at) as date,
      0 - finance_refunds.amount as amount,
      finance_refunds.created_at
      from finance_refunds
      inner join finance_payments on finance_payments.id=finance_refunds.payment_id
      where finance_payments.method in ('check','paypal','cash')
      and finance_refunds.deposit_id is null
    `)
  },

  down: async (knex) => {
  }

}

export default CreateUndeposited
