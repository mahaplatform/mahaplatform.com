const AddProgramMerchantAccount = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex.schema.table('crm_programs', (table) => {
      table.integer('merchant_id').unsigned()
      table.foreign('merchant_id').references('finance_merchants.id')
    })
  },

  down: async (knex) => {
  }

}

export default AddProgramMerchantAccount
