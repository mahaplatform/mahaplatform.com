import { activity } from '../../../../../core/services/routes/activities'
import DepositSerializer from '../../../serializers/deposit_serializer'
import { audit } from '../../../../../core/services/routes/audit'
import socket from '../../../../../core/services/routes/emitter'
import Payment from '../../../models/payment'
import Deposit from '../../../models/deposit'

const createRoute = async (req, res) => {

  const deposit = await Deposit.forge({
    team_id: req.team.get('id'),
    merchant_id: req.body.merchant_id,
    date: req.body.date,
    status: 'pending'
  }).save(null, {
    transacting: req.trx
  })

  await Promise.mapSeries(req.body.payment_ids, async(id) => {

    const payment = await Payment.query(qb => {
      qb.where('team_id', req.team.get('id'))
      qb.where('id', id)
    }).fetch({
      transacting: req.trx
    })

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

  await deposit.load(['payments','merchant'], {
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
