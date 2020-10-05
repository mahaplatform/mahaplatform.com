const RemoveExpenseTypeTeam = {

  up: async (knex) => {

    await knex.schema.table('finance_expense_types', (table) => {
      table.dropColumn('team_id')
    })

    await knex.schema.table('finance_revenue_types', (table) => {
      table.dropColumn('team_id')
    })

    await knex('finance_expense_types').whereIn('id', [85,86,87])

  },

  down: async (knex) => {
  }

}

export default RemoveExpenseTypeTeam
