const UpdatePaymentDetails = {

  up: async (knex) => {

    await knex.raw('drop view finance_allocations')

    await knex.raw('drop view finance_deposit_totals')

    await knex.raw('drop view finance_payment_details')

    await knex.raw(`
      create view finance_payment_details as
      with fees as (
      select finance_payments.id as payment_id,
      case
      when finance_payments.method in ('scholarship','credit','cash','check') then 0.00
      else round(floor((finance_payments.rate * finance_payments.amount + 0.3) * 100) / 100, 2)
      end as fee
      from finance_payments
      )
      select finance_payments.id as payment_id,
      deposit_id,
      case
      when finance_payments.method in ('scholarship','credit','cash','check') then null
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
      create view finance_deposit_totals as
      with payments as (
      select finance_deposits.id as deposit_id,
      count(distinct finance_payments.*) as count
      from finance_deposits
      left join finance_payments on finance_payments.deposit_id=finance_deposits.id
      group by finance_deposits.id
      ),
      totals as (
      select finance_deposits.id as deposit_id,
      sum(finance_payments.amount) as total
      from finance_deposits
      left join finance_payments on finance_payments.deposit_id=finance_deposits.id
      group by finance_deposits.id
      ),
      fees as (
      select finance_deposits.id as deposit_id,
      sum(finance_payment_details.fee) as total
      from finance_deposits
      left join finance_payment_details on finance_payment_details.deposit_id=finance_deposits.id
      group by finance_deposits.id
      )
      select finance_deposits.id as deposit_id,
      coalesce(payments.count, 0) as payments_count,
      coalesce(totals.total, 0.00) as total,
      coalesce(fees.total, 0.00) as fee,
      coalesce(totals.total - fees.total, 0.00) as amount
      from finance_deposits
      left join payments on payments.deposit_id=finance_deposits.id
      left join totals on totals.deposit_id=finance_deposits.id
      left join fees on fees.deposit_id=finance_deposits.id
    `)

    await knex.raw(`
      create view finance_allocations as
      with percents as (
      select finance_invoice_line_items.line_item_id,
      case
      when finance_invoice_totals.total > 0
      then finance_invoice_line_items.allocated / finance_invoice_totals.total
      else 0
      end as percent
      from finance_invoice_line_items
      inner join finance_invoice_totals on finance_invoice_totals.invoice_id=finance_invoice_line_items.invoice_id
      )
      select finance_payments.team_id,
      finance_payments.id as payment_id,
      finance_line_items.id as line_item_id,
      finance_invoices.customer_id,
      finance_line_items.project_id,
      finance_line_items.revenue_type_id,
      case
      when finance_invoice_line_items.delta=0
      then round(ceil(percents.percent * finance_payment_details.disbursed * 100) / 100, 2)
      else round(floor(percents.percent * finance_payment_details.disbursed * 100) / 100, 2)
      end as amount,
      case
      when finance_invoice_line_items.delta=0
      then round(ceil(percents.percent * finance_payment_details.fee * 100) / 100, 2)
      else round(floor(percents.percent * finance_payment_details.fee * 100) / 100, 2)
      end as fee,
      case
      when finance_invoice_line_items.delta=0
      then round(ceil(percents.percent * finance_payments.amount * 100) / 100, 2)
      else round(floor(percents.percent * finance_payments.amount * 100) / 100, 2)
      end as total
      from finance_payments
      inner join finance_invoices on finance_invoices.id=finance_payments.invoice_id
      inner join finance_payment_details on finance_payment_details.payment_id=finance_payments.id
      inner join finance_line_items on finance_line_items.invoice_id=finance_payments.invoice_id
      inner join finance_invoice_line_items on finance_invoice_line_items.line_item_id=finance_line_items.id
      inner join percents on percents.line_item_id=finance_line_items.id
    `)

    await knex('finance_payments').where('method','paypal').update('rate','0.0290')

  },

  down: async (knex) => {
  }

}

export default UpdatePaymentDetails
