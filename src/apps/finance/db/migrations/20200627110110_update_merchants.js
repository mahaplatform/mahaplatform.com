const UpdateMerchants = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex('finance_merchants').where('id', 1).update({
      integration: {
        bank_code: 'B10010'
      }
    })

    await knex('finance_merchants').where('id', 2).update({
      integration: {
        bank_code: 'B10013'
      }
    })

  },

  down: async (knex) => {}

}

export default UpdateMerchants
