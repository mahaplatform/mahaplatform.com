import { destroyCheck } from '../../../services/checks'
import socket from '../../../../../core/services/routes/emitter'
import Check from '../../../models/check'

const destroyRoute = async (req, res) => {

  const check = await Check.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  const channels = [
    `/admin/finance/checks/${check.get('id')}`,
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ]

  await destroyCheck(req, check)

  await socket.refresh(req, channels)

  res.status(200).respond(true)

}

export default destroyRoute
