const UpdatePaymentDetails = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('drop view finance_payment_details')

    await knex.raw(`
      create view finance_payment_details as
      with fees as (
      select finance_payments.id as payment_id,
      case
      when finance_payments.method in ('scholarship','credit','cash','check') then 0.00
      when finance_payments.method = 'paypal' then round(round((finance_payments.rate * finance_payments.amount) * 100) / 100, 2)
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

    const payments = await knex('finance_payment_details').innerJoin('finance_payments','finance_payments.id','finance_payment_details.payment_id').where('finance_payments.method', 'paypal')

    await Promise.mapSeries(payments, async (payment) => {

      const allocations = await knex('finance_allocations').where('payment_id', payment.id)

      const amount = Math.round(allocations.reduce((total, allocation) => {
        return total + Number(allocation.amount)
      }, 0.00) * 100) / 100

      const disbursed = Number(payment.disbursed)

      if(disbursed === amount) return

      const diff = Math.round((amount - disbursed) * 100) / 100

      await knex('finance_allocations').where('id', allocations[0].id).update({
        amount: Math.round((Number(allocations[0].amount) - diff) * 100) / 100,
        fee: Math.round((Number(allocations[0].fee) + diff) * 100) / 100
      })

    })

  },

  down: async (knex) => {
  }

}

export default UpdatePaymentDetails
