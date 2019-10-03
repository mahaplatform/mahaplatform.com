const AddReceiptsToChecks = {

  up: async (knex) => {

    await knex.schema.table('expenses_receipts', (table) => {
      table.integer('check_id').unsigned()
      table.foreign('check_id').references('expenses_checks.id')
    })

  },

  down: async (knex) => {

    await knex.schema.table('expenses_receipts', (table) => {
      table.dropColumn('check_id')
      table.dropColumn('check_id')
    })

  }

}

export default AddReceiptsToChecks
