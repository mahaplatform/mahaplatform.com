const AddBankAchRate = {

  up: async (knex) => {

    await knex.schema.table('finance_banks', (table) => {
      table.decimal('ach_rate', 5, 4)
    })

    await knex('finance_banks').update({
      ach_rate: 0.0075
    })

    await Promise.mapSeries([4,128,370,409], async (id) => {
      await knex('finance_payments').where('id', id).update({
        rate: 0.0075
      })
    })

    await knex.raw('drop view finance_payment_details')

    await knex.raw(`
      create view finance_payment_details as
      with fees as (
      select finance_payments.id as payment_id,
      case
      when finance_payments.method in ('scholarship','credit','cash','check') then 0.00
      else round(floor((finance_payments.rate * finance_payments.amount) * 100) / 100, 2)
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
      when finance_payments.method in ('scholarship','credit','cash','check') then null
      when finance_payments.method='check' then concat('#',finance_payments.reference)
      when finance_payments.method='paypal' then finance_payment_methods.email
      when finance_payments.method='ach' then concat(finance_payment_methods.bank_name,'-',finance_payment_methods.last_four)
      else upper(concat(finance_payment_methods.card_type,'-',finance_payment_methods.last_four))
      end as description,
      fees.fee_percent + fees.fee_flat as fee,
      finance_payments.amount - fees.fee_percent - fees.fee_flat as disbursed
      from finance_payments
      left join finance_payment_methods on finance_payment_methods.id = finance_payments.payment_method_id
      left join fees on fees.payment_id = finance_payments.id
    `)

    await knex('finance_allocations').where('payment_id', 4).update({
      amount: 4.97,
      fee: 0.03
    })
    await knex('finance_allocations').where('payment_id', 128).update({
      amount: 9.93,
      fee: 0.07
    })
    await knex('finance_allocations').where('payment_id', 370).update({
      amount: 4.97,
      fee: 0.03
    })
    await knex('finance_allocations').where('payment_id', 409).update({
      amount: 4.97,
      fee: 0.03
    })

  },

  down: async (knex) => {
  }

}

export default AddBankAchRate
