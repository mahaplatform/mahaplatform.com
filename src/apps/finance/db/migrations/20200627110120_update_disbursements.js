const UpdateDisbursements = {

  up: async (knex) => {

    await knex.schema.table('finance_disbursements', (table) => {
      table.enum('status', ['pending','exported'], { useNative: true, enumName: 'finance_disbursement_statuses' })
    })

    await knex('finance_disbursements').update({
      status: 'pending'
    })

  },

  down: async (knex) => {}

}

export default UpdateDisbursements
