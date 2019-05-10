const AddBatchTotal = {

  up: async (knex) => {

    await knex.schema.table('expenses_batches', (table) => {
      table.decimal('total', 9, 2)
    })

    const batches = await knex('expenses_batches')

    await Promise.map(batches, async (batch) => {

      const batch_id = batch.id

      const items = await knex('expenses_items').where({ batch_id })

      const total = items.reduce((total, item) => total + parseFloat(item.amount), 0.00).toFixed(2)

      await knex('expenses_batches').where({ id: batch_id }).update({ total })

    })

  },

  down: async (knex) => {

    await knex.schema.table('expenses_batches', (table) => {
      table.dropColumn('total')
    })

  }
}

export default AddBatchTotal
