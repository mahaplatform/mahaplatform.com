import braintree from '../../../../core/services/braintree'
import Payment from '../../models/payment'
import _ from 'lodash'

const getTransactions = async(ids) => {
  return await new Promise((resolve, reject) => {
    braintree.transaction.search(search => {
      search.ids().in(ids)
    }, (err, result) => {
      if(err) return reject(err)
      const length = result.length()
      if(length === 0) resolve([])
      const data = []
      result.each((err, item) => {
        data.push(item)
        if(data.length === length) resolve(data)
      })
    })
  }).then(results => results.reduce((transactions, transaction) => ({
    ...transactions,
    [transaction.id]: transaction
  }), {}))
}

const AddPaypalId = {

  up: async (knex) => {

    // await knex.schema.table('finance_payments', (table) => {
    //   table.string('paypal_id')
    // })

    const payments = await Payment.query(qb => {
      qb.where('method', 'paypal')
      qb.whereNull('paypal_id')
    }).fetchAll({
      transacting: knex
    }).then(results => results.toArray())

    const transactions = await getTransactions(payments.map(payment => {
      return payment.get('braintree_id')
    }))

    await Promise.mapSeries(payments, async(payment) => {

      const transaction = transactions[payment.get('braintree_id')]

      if(!transaction) return

      const paypal_id = _.get(transaction, 'paypal.authorizationId')

      if(!paypal_id) return

      await payment.save({
        paypal_id
      },{
        patch: true,
        transacting: knex
      })

    })

  },

  down: async (knex) => {
  }

}

export default AddPaypalId
