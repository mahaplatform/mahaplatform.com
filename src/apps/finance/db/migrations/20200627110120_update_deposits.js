const UpdateDeposits = {

  up: async (knex) => {

    await knex.schema.table('finance_deposits', (table) => {
      table.enum('status', ['pending','exported'], { useNative: true, enumName: 'finance_deposit_statuses' })
    })

    await knex('finance_deposits').update({
      status: 'pending'
    })

  },

  down: async (knex) => {}

}

export default UpdateDeposits
