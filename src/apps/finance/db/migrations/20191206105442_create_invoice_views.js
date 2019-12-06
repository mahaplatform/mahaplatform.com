const CreateInvoiceViews = {

  up: async (knex) => {

    await knex.schema.table('finance_invoices', (table) => {
      table.dropColumn('status')
    })

    await knex.raw(`
      create view finance_invoice_line_items as
      select finance_invoices.id as invoice_id,
      sum(finance_line_items.quantity * finance_line_items.price) as total,
      round(sum(finance_line_items.quantity * finance_line_items.price * finance_line_items.tax_rate), 2) as tax
      from finance_invoices
      inner join finance_line_items on finance_line_items.invoice_id = finance_invoices.id
      group by finance_invoices.id
    `)

    await knex.raw(`
      create view finance_invoice_payments as
      select finance_invoices.id as invoice_id,
      coalesce(sum(finance_payments.amount), 0.00) as paid
      from finance_invoices
      left join finance_payments on finance_payments.invoice_id = finance_invoices.id and finance_payments.voided_date is null
      group by finance_invoices.id
    `)

    await knex.raw(`
      create view finance_invoice_subtotals as
      select finance_invoices.id as invoice_id,
      sum(finance_invoice_line_items.total) as subtotal,
      sum(finance_invoice_line_items.tax) as tax,
      case
      when finance_invoices.discount_percent is not null then round(sum(finance_invoice_line_items.total) * finance_invoices.discount_percent, 2)
      when finance_invoices.discount_amount is not null then finance_invoices.discount_amount
      else 0.00
      end as discount
      from finance_invoices
      inner join finance_invoice_line_items on finance_invoice_line_items.invoice_id = finance_invoices.id
      group by finance_invoices.id;
    `)

    await knex.raw(`
      create view finance_invoice_totals as
      select finance_invoices.id as invoice_id,
      finance_invoice_subtotals.subtotal + finance_invoice_subtotals.tax - finance_invoice_subtotals.discount as total
      from finance_invoices
      inner join finance_invoice_subtotals on finance_invoice_subtotals.invoice_id = finance_invoices.id
      inner join finance_invoice_payments on finance_invoice_payments.invoice_id = finance_invoices.id;
    `)

    await knex.raw(`
      create view finance_invoice_details as
      select finance_invoices.id as invoice_id,
      finance_invoice_subtotals.subtotal,
      finance_invoice_subtotals.tax,
      finance_invoice_payments.paid,
      finance_invoice_subtotals.discount,
      finance_invoice_totals.total,
      finance_invoice_totals.total - finance_invoice_payments.paid as balance,
      case
      when finance_invoices.voided_date is not null then 'void'
      when finance_invoice_payments.paid >= finance_invoice_totals.total then 'paid'
      when finance_invoices.due > now() then 'overdue'
      else 'unpaid'
      end as status
      from finance_invoices
      inner join finance_invoice_totals on finance_invoice_totals.invoice_id = finance_invoices.id
      inner join finance_invoice_subtotals on finance_invoice_subtotals.invoice_id = finance_invoices.id
      inner join finance_invoice_payments on finance_invoice_payments.invoice_id = finance_invoices.id;
    `)

  },

  down: async (knex) => {
  }

}

export default CreateInvoiceViews
