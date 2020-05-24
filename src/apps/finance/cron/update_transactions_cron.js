import socket from '../../../core/services/routes/emitter'
import braintree from '../../../core/services/braintree'
import Disbursement from '../models/disbursement'
import cron from '../../../core/objects/cron'
import Merchant from '../models/merchant'
import Payment from '../models/payment'
import Refund from '../models/refund'

const getTransactions = async(ids) => {
  return await new Promise((resolve, reject) => {
    braintree.transaction.search(search => {
      search.ids().in(ids)
    }, (err, result) => {
      if(err) return reject(err)
      const length = result.length()
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

const updatePayments = async (req) => {

  const payments = await Payment.query(qb => {
    qb.whereIn('method', ['ach','card','googlepay','applepay','paypal'])
    qb.whereNotIn('status',['disbursed','voided'])
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const transactions = await getTransactions(payments.map(payment => {
    return payment.get('braintree_id')
  }))

  await Promise.mapSeries(payments, async(payment) => {

    const transaction = transactions[payment.get('braintree_id')]

    if(payment.get('status') !== 'disbursed' && transaction.disbursementDetails.disbursementDate) {

      const merchant = await Merchant.query(qb => {
        qb.where('braintree_id', transaction.merchantAccountId)
      }).fetch({
        transacting: req.trx
      })

      const disbursement = await Disbursement.fetchOrCreate({
        team_id: payment.get('team_id'),
        merchant_id: merchant.get('id'),
        date: transaction.disbursementDetails.disbursementDate
      }, {
        transacting: req.trx
      })

      await payment.save({
        disbursement_id: disbursement.get('id'),
        status: 'disbursed'
      },{
        patch: true,
        transacting: req.trx
      })

    } else if(payment.get('status') !== 'settled' && transaction.status === 'settled') {

      await payment.save({
        status: 'settled'
      },{
        patch: true,
        transacting: req.trx
      })

    }

  })

}

const updateRefunds = async (req) => {

  const refunds = await Refund.query(qb => {
    qb.where('type', 'card')
    qb.whereNotIn('status',['settled','voided'])
  }).fetchAll({
    transacting: req.trx
  }).then(results => results.toArray())

  const transactions = await getTransactions(refunds.map(refund => {
    return refund.get('braintree_id')
  }))

  await Promise.mapSeries(refunds, async(refund) => {

    const transaction = transactions[refund.get('braintree_id')]

    if(transaction.status === 'settled') {
      await refund.save({
        status: 'settled'
      },{
        patch: true,
        transacting: req.trx
      })
    }

  })

}

export const processor = async (req) => {

  await updatePayments(req)

  await updateRefunds(req)

}

export const afterCommit = async (trx, result) => {
  await socket.refresh({ trx }, [
    '/admin/finance/disbursements',
    '/admin/finance/payments',
    '/admin/finance/refunds'
  ])
}

const updateTransactionsCron = cron({
  name: 'update_transactions',
  schedule: '0 0 * * * *',
  processor,
  afterCommit
})

export default updateTransactionsCron
