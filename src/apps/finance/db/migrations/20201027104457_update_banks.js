const UpdateBanks = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('finance_banks', (table) => {
      table.dropColumn('is_active')
    })

    await knex('finance_banks').update({
      has_paypal: false
    })

    await knex('finance_banks').where('id', '<', 3).update({
      has_paypal: true
    })

  },

  down: async (knex) => {
  }

}

export default UpdateBanks
