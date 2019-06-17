const AddReceiptsToReimbursements = {

  up: async (knex) => {

    await knex.schema.table('expenses_receipts', (table) => {
      table.integer('reimbursement_id').unsigned()
      table.foreign('reimbursement_id').references('expenses_reimbursements.id')
    })

  },

  down: async (knex) => {

    await knex.schema.table('expenses_receipts', (table) => {
      table.dropColumn('reimbursement_id')
      table.dropColumn('reimbursement_id')
    })

  }

}

export default AddReceiptsToReimbursements
