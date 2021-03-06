const TaxDeductible = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw('drop view finance_invoice_details')

    await knex.raw('drop view finance_invoice_totals')

    await knex.raw('drop view finance_invoice_subtotals')

    await knex.raw('drop view finance_invoice_line_items')

    await knex.schema.dropTable('finance_coupons_products')

    await knex.schema.table('finance_coupons', (table) => {
      table.integer('product_id').unsigned()
      table.foreign('product_id').references('finance_products.id')
    })

    await knex.schema.table('finance_invoices', (table) => {
      table.dropColumn('discount_amount')
      table.dropColumn('discount_percent')
    })

    await knex.schema.table('finance_products', (table) => {
      table.boolean('is_tax_deductible')
    })

    await knex.schema.table('finance_line_items', (table) => {
      table.boolean('is_tax_deductible')
      table.decimal('discount_amount', 5, 2)
      table.decimal('discount_percent', 5, 4)
    })

    await knex.raw(`
      create view finance_invoice_line_items as
      select finance_invoices.id as invoice_id,
      finance_line_items.id as line_item_id,
      finance_line_items.quantity * finance_line_items.price as total,
      finance_line_items.quantity * finance_line_items.price * case when finance_line_items.is_tax_deductible then 1 else 0 end as tax_deductible,
      round(finance_line_items.quantity * finance_line_items.price * finance_line_items.tax_rate, 2) as tax,
      case
      when finance_line_items.discount_amount is not null then finance_line_items.discount_amount
      when finance_line_items.discount_percent is not null then finance_line_items.quantity * finance_line_items.price * finance_line_items.discount_percent
      else 0.00
      end as discount
      from finance_invoices
      inner join finance_line_items on finance_line_items.invoice_id = finance_invoices.id
    `)

    await knex.raw(`
      create view finance_invoice_subtotals as
      select finance_invoices.id as invoice_id,
      sum(finance_invoice_line_items.total) as subtotal,
      sum(finance_invoice_line_items.tax) as tax,
      sum(finance_invoice_line_items.tax_deductible) as tax_deductible,
      sum(finance_invoice_line_items.discount) as discount
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
    await knex.raw(`
      create view finance_revenues as
      select finance_payments.team_id,
      finance_payments.id as payment_id,
      finance_invoices.customer_id,
      finance_line_items.description,
      finance_invoices.program_id,
      finance_line_items.project_id,
      finance_line_items.revenue_type_id,
      round((finance_payments.amount / finance_invoice_totals.total) * (finance_invoice_line_items.total - finance_invoice_line_items.discount), 2) as amount,
      finance_payments.date,
      finance_payments.created_at
      from finance_payments
      inner join finance_invoice_totals on finance_invoice_totals.invoice_id=finance_payments.invoice_id
      inner join finance_line_items on finance_line_items.invoice_id=finance_payments.invoice_id
      inner join finance_invoice_line_items on finance_invoice_line_items.line_item_id=finance_line_items.id
      inner join finance_invoices on finance_invoices.id=finance_payments.invoice_id
      where finance_payments.voided_date is null;
    `)

  },

  down: async (knex) => {
  }

}

export default TaxDeductible
