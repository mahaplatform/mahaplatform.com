const TaxDeductible = {

  up: async (knex) => {

    await knex.schema.table('finance_products', (table) => {
      table.boolean('is_tax_deductible')
    })

    await knex.schema.table('finance_line_items', (table) => {
      table.boolean('is_tax_deductible')
    })

    await knex.raw('drop view finance_invoice_details')

    await knex.raw('drop view finance_invoice_totals')

    await knex.raw('drop view finance_invoice_subtotals')

    await knex.raw('drop view finance_invoice_line_items')

    await knex.raw(`
      create view finance_invoice_line_items as
      select finance_invoices.id as invoice_id,
      sum(finance_line_items.quantity * finance_line_items.price) as total,
      sum(finance_line_items.quantity * finance_line_items.price * case when finance_line_items.is_tax_deductible then 1 else 0 end) as tax_deductible,
      round(sum(finance_line_items.quantity * finance_line_items.price * finance_line_items.tax_rate), 2) as tax
      from finance_invoices
      inner join finance_line_items on finance_line_items.invoice_id = finance_invoices.id
      group by finance_invoices.id
    `)

    await knex.raw(`
      create view finance_invoice_subtotals as
      select finance_invoices.id as invoice_id,
      sum(finance_invoice_line_items.total) as subtotal,
      sum(finance_invoice_line_items.tax) as tax,
      sum(finance_invoice_line_items.tax_deductible) as tax_deductible,
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
      finance_invoice_subtotals.tax_deductible,
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

export default TaxDeductible
