const AddCrossBorderRate = {

  up: async (knex) => {

    await knex.schema.table('finance_payments', (table) => {
      table.decimal('cross_border_rate', 5, 4)
    })

    await knex('finance_payments').whereNotIn('method', ['scholarship','credit','cash','check']).update({
      cross_border_rate: 0.0000
    })

    await knex.raw('drop view finance_undeposited')

    await knex.raw('drop view finance_payment_details')

    await knex.raw(`
      create view finance_payment_details as
      with fees as (
      select finance_payments.id as payment_id,
      case
      when finance_payments.method in ('scholarship','credit','cash','check') then 0.00
      when finance_payments.method = 'paypal' then round(round(((finance_payments.rate + finance_payments.cross_border_rate) * finance_payments.amount) * 100) / 100, 2)
      else round(floor(((finance_payments.rate + finance_payments.cross_border_rate) * finance_payments.amount) * 100) / 100, 2)
      end as fee_percent,
      case
      when finance_payments.method in ('scholarship','ach','credit','cash','check') then 0.00
      else 0.30
      end as fee_flat
      from finance_payments
      )
      select finance_payments.id as payment_id,
      deposit_id,
      case
      when finance_payments.method in ('scholarship','credit') then null
      when finance_payments.method='cash' then 'CASH'
      when finance_payments.method='check' then concat('CHECK #',finance_payments.reference)
      when finance_payments.method='paypal' then concat('PAYPAL-',finance_payment_methods.email)
      when finance_payments.method='ach' then concat(finance_payment_methods.bank_name,'-',finance_payment_methods.last_four)
      else upper(concat(finance_payment_methods.card_type,'-',finance_payment_methods.last_four))
      end as description,
      fees.fee_percent + fees.fee_flat as fee,
      finance_payments.amount - fees.fee_percent - fees.fee_flat as disbursed
      from finance_payments
      left join finance_payment_methods on finance_payment_methods.id = finance_payments.payment_method_id
      left join fees on fees.payment_id = finance_payments.id
    `)

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

export default AddCrossBorderRate
