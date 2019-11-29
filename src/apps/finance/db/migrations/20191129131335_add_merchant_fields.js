const AddMerchantFields = {

  up: async (knex) => {
    await knex.schema.table('finance_merchants', (table) => {
      table.date('applied_on')
    })
  },

  down: async (knex) => {
  }

}

export default AddMerchantFields
