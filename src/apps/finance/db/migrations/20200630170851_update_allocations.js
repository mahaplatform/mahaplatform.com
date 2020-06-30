const UpdateAllocations = {

  up: async (knex) => {

    await knex.raw('drop view finance_allocation_details')

    await knex.raw('drop table finance_allocations')

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

    knex('maha_audits').where('story_id', 2220).update('story_id', 9)

  },

  down: async (knex) => {
  }

}

export default UpdateAllocations
