const AddStatuses = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('finance_merchants', (table) => {
      table.enum('status', ['pending','active','disabled'], { useNative: true, enumName: 'finance_merchants_status' })
    })

    await knex.schema.table('finance_invoices', (table) => {
      table.enum('status', ['unpaid','paid','voided'], { useNative: true, enumName: 'finance_invoices_status' })
    })

  },

  down: async (knex) => {
  }

}

export default AddStatuses
