import socket from '@core/services/routes/emitter'
import { destroyCheck } from '@apps/finance/services/checks'
import Check from '@apps/finance/models/check'

const destroyRoute = async (req, res) => {

  const check = await Check.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!check) return res.status(404).respond({
    code: 404,
    message: 'Unable to load check'
  })

  await destroyCheck(req, check)

  await socket.refresh(req, [
    `/admin/finance/checks/${check.get('id')}`,
    '/admin/finance/approvals',
    '/admin/finance/reports',
    {
      channel: 'user',
      target: '/admin/finance/items'
    }
  ])

  await res.status(200).respond(true)

}

export default destroyRoute
