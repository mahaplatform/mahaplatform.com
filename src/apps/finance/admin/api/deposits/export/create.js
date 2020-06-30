import { activity } from '../../../../../../core/services/routes/activities'
import { audit } from '../../../../../../core/services/routes/audit'
import socket from '../../../../../../core/services/routes/emitter'
import Deposit from '../../../../models/deposit'

const createRoute = async (req, res) => {

  const deposit = await Deposit.query(qb => {
    qb.select('finance_deposits.*','finance_deposit_totals.*')
    qb.innerJoin('finance_deposit_totals', 'finance_deposit_totals.deposit_id', 'finance_deposits.id')
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['merchant'],
    transacting: req.trx
  })

  if(!deposit) return res.status(404).respond({
    code: 404,
    message: 'Unable to load deposit'
  })

  await deposit.save({
    status: 'exported'
  }, {
    transacting: req.trx,
    patch: true
  })

  await activity(req, {
    story: 'exported {object}',
    object: deposit
  })

  await audit(req, {
    story: 'exported',
    auditable: deposit
  })

  await socket.refresh(req, [
    '/admin/finance/deposits',
    `/admin/finance/deposits/${deposit.id}`
  ])

  res.status(200).respond(true)

}

export default createRoute
