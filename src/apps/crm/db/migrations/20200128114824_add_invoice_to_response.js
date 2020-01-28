const AddInvoiceToResponse = {

  up: async (knex) => {
    await knex.schema.table('crm_responses', (table) => {
      table.integer('invoice_id').unsigned()
      table.foreign('invoice_id').references('finance_invoices.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddInvoiceToResponse
