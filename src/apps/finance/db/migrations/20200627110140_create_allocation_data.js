import Allocation from '@apps/finance/models/allocation'
import Payment from '@apps/finance/models/payment'
import Invoice from '@apps/finance/models/invoice'

const CreateAllocationData = {

  databaseName: 'maha',

  up: async (knex) => {

    // split donations from

    const invoices = await Invoice.fetchAll({
      withRelated: [{
        line_items: qb => qb.orderBy('id', 'asc')
      }],
      transacting: knex
    })

    await Promise.mapSeries(invoices, async (invoice) => {
      await Promise.mapSeries(invoice.related('line_items'), async (line_item, delta) => {
        await line_item.save({
          delta
        },{
          transacting: knex
        })
      })
    })

    const payments = await Payment.fetchAll({
      withRelated: ['invoice.line_items'],
      transacting: knex
    })

    await Promise.mapSeries(payments, async (payment) => {
      await Promise.mapSeries(payment.related('invoice').related('line_items'), async (line_item, delta) => {
        await Allocation.forge({
          team_id: payment.get('team_id'),
          payment_id: payment.get('id'),
          line_item_id: line_item.get('id')
        }).save(null, {
          transacting: knex
        })
      })
    })

  },

  down: async (knex) => {
  }

}

export default CreateAllocationData
