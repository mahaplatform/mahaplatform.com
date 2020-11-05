import { activity } from '@core/services/routes/activities'
import DepositSerializer from '../../../serializers/deposit_serializer'
import { audit } from '@core/services/routes/audit'
import socket from '@core/services/routes/emitter'
import Payment from '../../../models/payment'
import Deposit from '../../../models/deposit'
import Refund from '../../../models/refund'

const createRoute = async (req, res) => {

  const deposit = await Deposit.forge({
    team_id: req.team.get('id'),
    bank_id: req.body.bank_id,
    date: req.body.date,
    status: 'pending'
  }).save(null, {
    transacting: req.trx
  })

  const { payment_ids, refund_ids } = req.body.transactions

  if(payment_ids.length > 0) {

    const payments = await Payment.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.whereIn('id', payment_ids)
    }).fetchAll({
      transacting: req.trx
    })

    await Promise.mapSeries(payments, async(payment) => {

      await payment.save({
        deposit_id: deposit.get('id'),
        status: 'deposited'
      },{
        transacting: req.trx
      })

      await audit(req, {
        story: 'deposited',
        auditable: payment
      })

    })

  }

  if(refund_ids.length > 0) {

    const refunds = await Refund.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.whereIn('id', refund_ids)
    }).fetchAll({
      transacting: req.trx
    })

    await Promise.mapSeries(refunds, async(refund) => {

      await refund.save({
        deposit_id: deposit.get('id'),
        status: 'deposited'
      },{
        transacting: req.trx
      })

      await audit(req, {
        story: 'deposited',
        auditable: refund
      })

    })
  }
  await deposit.load(['payments','bank'], {
    transacting: req.trx
  })

  await audit(req, {
    story: 'created',
    auditable: deposit
  })

  await activity(req, {
    story: 'created {object}',
    object: deposit
  })

  await socket.refresh(req, [
    '/admin/finance/deposits'
  ])

  res.status(200).respond(deposit, DepositSerializer)

}

export default createRoute
