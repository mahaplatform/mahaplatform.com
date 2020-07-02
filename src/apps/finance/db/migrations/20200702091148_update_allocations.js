const UpdateAllocations = {

  up: async (knex) => {

    await knex.raw('drop view finance_allocations')

    await knex.raw(`
    create view finance_allocations as
    with computed as (
    select row_number() over(partition by payment_id order by finance_invoice_line_items.total desc) as index,
    finance_invoice_line_items.line_item_id,
    finance_payments.id as payment_id,
    case
    when finance_invoice_totals.total > 0
    then round((finance_invoice_line_items.allocated / finance_invoice_totals.total) * finance_payment_details.fee, 2)
    else 0
    end as amount
    from finance_invoice_line_items
    inner join finance_invoice_totals on finance_invoice_totals.invoice_id=finance_invoice_line_items.invoice_id
    inner join finance_payments on finance_payments.invoice_id=finance_invoice_line_items.invoice_id
    inner join finance_payment_details on finance_payment_details.payment_id=finance_payments.id
    ),
    totaled as (
    select computed.payment_id,
    sum(computed.amount) as amount
    from computed
    group by computed.payment_id
    ),
    diffed as (
    select totaled.payment_id,
    finance_payment_details.fee - totaled.amount as amount
    from totaled
    inner join finance_payment_details on finance_payment_details.payment_id=totaled.payment_id
    ),
    adjusted as (
    select computed.*,
    case
    when computed.index = 1 then computed.amount + diffed.amount
    else computed.amount
    end as fee
    from computed
    inner join diffed on diffed.payment_id=computed.payment_id
    )
    select finance_invoices.team_id,
    adjusted.payment_id,
    adjusted.line_item_id,
    finance_invoice_line_items.total - adjusted.fee as amount,
    adjusted.fee as fee,
    finance_invoice_line_items.total
    from adjusted
    inner join finance_line_items on finance_line_items.id=adjusted.line_item_id
    inner join finance_invoice_line_items on finance_invoice_line_items.line_item_id=adjusted.line_item_id
    inner join finance_invoices on finance_invoices.id=finance_line_items.invoice_id
    `)

  },

  down: async (knex) => {
  }

}

export default UpdateAllocations
