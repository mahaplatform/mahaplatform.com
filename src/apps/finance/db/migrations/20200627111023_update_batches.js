const UpdateBatches = {

  up: async (knex) => {

    await knex.schema.table('finance_batches', (table) => {
      table.enum('type', ['expense','revenue'], { useNative: true, enumName: 'finance_batch_types' })
      table.dropColumn('items_count')
      table.dropColumn('total')
    })

    await knex('finance_batches').update({
      type: 'expense'
    })

    await knex.raw(`
      create or replace view finance_batch_totals as
      select finance_batches.id as batch_id,
      count(finance_items.*) as items_count,
      sum(finance_items.amount) as total
      from finance_batches
      left join finance_items on finance_items.batch_id=finance_batches.id
      where finance_batches.type = 'expense'
      group by finance_batches.id
    `)

  },

  down: async (knex) => {
  }

}

export default UpdateBatches
