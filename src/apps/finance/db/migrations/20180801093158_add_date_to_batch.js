import Batch from '@apps/finance/models/batch'

const AddDateToBatch = {

  up: async (knex) => {

    await knex.schema.table('expenses_batches', (table) => {
      table.date('date')
    })

    const batches = await Batch.fetchAll({ transacting: knex })

    await Promise.mapSeries(batches.toArray(), async (batch) => {

      await batch.save({
        date: batch.get('created_at')
      }, {
        patch: true,
        transacting: knex
      })

    })

  },

  down: async (knex) => {

    await knex.schema.table('expenses_batches', (table) => {
      table.dropColumn('date')
    })

  }

}

export default AddDateToBatch
