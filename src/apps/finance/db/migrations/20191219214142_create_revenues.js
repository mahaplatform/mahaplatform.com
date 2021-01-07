const CreateRevenue = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.raw(`
      create or replace view finance_revenues as
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

  down: async (knex) => {}

}

export default CreateRevenue
