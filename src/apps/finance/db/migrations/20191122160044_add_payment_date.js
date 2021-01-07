const AddPaymentDate = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('finance_payments', (table) => {
      table.date('date')
    })
  },

  down: async (knex) => {
  }

}

export default AddPaymentDate
