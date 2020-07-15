import { audit } from '../../../core/services/routes/audit'
import socket from '../../../core/services/routes/emitter'
import braintree from '../../../core/services/braintree'
import cron from '../../../core/objects/cron'
import Bank from '../models/bank'
import Deposit from '../models/deposit'
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

const getDeposit = async (req, { bank, payment, transaction }) => {

  const deposit = await Deposit.query(qb => {
    qb.where('team_id', req.team.get('id')),
    qb.where('bank_id', bank.get('id')),
    qb.where('date', transaction.disbursementDetails.disbursementDate)
  }).fetch({
    transacting: req.trx
  })

  if(deposit) return deposit

  const newdeposit = await Deposit.forge({
    team_id: req.team.get('id'),
    bank_id: bank.get('id'),
    date: transaction.disbursementDetails.disbursementDate
  }).save(null, {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: newdeposit
  })

  return newdeposit

}

const updatePayments = async (req) => {

  const payments = await Payment.query(qb => {
    qb.whereIn('method', ['ach','card','googlepay','applepay','paypal'])
    qb.whereNotIn('status',['deposited','voided'])
  }).fetchAll({
    withRelated: ['team'],
    transacting: req.trx
  }).then(results => results.toArray())

  const transactions = await getTransactions(payments.map(payment => {
    return payment.get('braintree_id')
  }))

  await Promise.mapSeries(payments, async(payment) => {

    req.team = payment.related('team')

    const transaction = transactions[payment.get('braintree_id')]

    if(!transaction) return

    if(payment.get('status') !== 'deposited' && transaction.disbursementDetails.disbursementDate) {

      const bank = await Bank.query(qb => {
        qb.where('braintree_id', transaction.merchantAccountId)
      }).fetch({
        transacting: req.trx
      })

      const deposit = await getDeposit(req, {
        bank,
        payment,
        transaction
      })

      await payment.save({
        deposit_id: deposit.get('id'),
        status: 'deposited'
      },{
        transacting: req.trx,
        patch: true
      })

      await audit(req, {
        story: 'deposited',
        auditable: payment
      })

    } else if(payment.get('status') !== 'settled' && transaction.status === 'settled') {

      await payment.save({
        status: 'settled'
      },{
        transacting: req.trx,
        patch: true
      })

      await audit(req, {
        story: 'settled',
        auditable: payment
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
        transacting: req.trx,
        patch: true
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
    '/admin/finance/deposits',
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
