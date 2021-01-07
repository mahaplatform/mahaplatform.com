const RemoveFees = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('finance_payments', (table) => {
      table.dropColumn('fee')
    })

  },

  down: async (knex) => {
  }

}

export default RemoveFees
