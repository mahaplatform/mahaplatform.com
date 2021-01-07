const DeactivateExpenseTypes = {

  databaseName: 'maha',

  up: async (knex) => {

    await knex.schema.table('expenses_expense_types', (table) => {
      table.boolean('is_active').defaultTo(false)
    })

    await knex('expenses_expense_types').update({ is_active: true })

  },

  down: async (knex) => {

    await knex.schema.table('expenses_expense_types', (table) => {
      table.dropColumn('is_active')
    })

  }

}

export default DeactivateExpenseTypes
