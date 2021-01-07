const InvoiceDonations = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('finance_line_items', (table) => {
      table.dropColumn('donation')
      table.dropColumn('base_price')
      table.dropColumn('donation_revenue_type_id')
    })

  },

  down: async (knex) => {
  }

}

export default InvoiceDonations
