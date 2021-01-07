const AddInvoiceProgram = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('finance_invoices', (table) => {
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('crm_programs.id')
      table.dropColumn('logo_id')
    })

  },

  down: async (knex) => {
  }

}

export default AddInvoiceProgram
