const RemoveEmptyAllocations = {

  databaseName: 'maha',

  up: async (knex) => {
    await knex('finance_allocations').where('amount', 0).del()
    await knex('finance_line_items').whereNull('price').del()
  },

  down: async (knex) => {
  }

}

export default RemoveEmptyAllocations
