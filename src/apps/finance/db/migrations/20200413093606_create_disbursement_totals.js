const CreateDisbursementTotals = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw('drop view finance_payment_details')
    await knex.raw(`
      create view finance_payment_details as
      with fees as (
      select finance_payments.id as payment_id,
      round(floor((finance_payments.rate * finance_payments.amount + 0.3) * 100) / 100, 2) as fee
      from finance_payments
      )
      select finance_payments.id as payment_id,
      disbursement_id,
      case
      when finance_payments.method='scholarship' then null
      when finance_payments.method='credit' then null
      when finance_payments.method='cash' then null
      when finance_payments.method='check' then concat('#',finance_payments.reference)
      when finance_payments.method='paypal' then finance_payment_methods.email
      else upper(concat(finance_payment_methods.card_type,'-',finance_payment_methods.last_four))
      end as description,
      fees.fee,
      amount - fees.fee as disbursed
      from finance_payments
      left join finance_payment_methods on finance_payment_methods.id = finance_payments.payment_method_id
      left join fees on fees.payment_id = finance_payments.id
    `)
    await knex.raw(`
      create view finance_disbursement_totals as
      with payments as (
      select finance_disbursements.id as disbursement_id,
      count(distinct finance_payments.*) as count
      from finance_disbursements
      left join finance_payments on finance_payments.disbursement_id=finance_disbursements.id
      group by finance_disbursements.id
      ),
      totals as (
      select finance_disbursements.id as disbursement_id,
      sum(finance_payments.amount) as total
      from finance_disbursements
      left join finance_payments on finance_payments.disbursement_id=finance_disbursements.id
      group by finance_disbursements.id
      ),
      fees as (
      select finance_disbursements.id as disbursement_id,
      sum(finance_payment_details.fee) as total
      from finance_disbursements
      left join finance_payment_details on finance_payment_details.disbursement_id=finance_disbursements.id
      group by finance_disbursements.id
      )
      select finance_disbursements.id as disbursement_id,
      coalesce(payments.count, 0) as payments_count,
      coalesce(totals.total, 0.00) as total,
      coalesce(fees.total, 0.00) as fee,
      coalesce(totals.total - fees.total, 0.00) as amount
      from finance_disbursements
      left join payments on payments.disbursement_id=finance_disbursements.id
      left join totals on totals.disbursement_id=finance_disbursements.id
      left join fees on fees.disbursement_id=finance_disbursements.id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateDisbursementTotals
