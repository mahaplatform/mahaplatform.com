const CreateCustomerProducts = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.raw(`
      create view finance_customer_products as
      select finance_invoices.customer_id, finance_line_items.product_id
      from finance_line_items
      inner join finance_invoices on finance_invoices.id=finance_line_items.invoice_id
    `)
  },

  down: async (knex) => {
  }

}

export default CreateCustomerProducts
