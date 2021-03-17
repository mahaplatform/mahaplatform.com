import { checkNameservers } from '@apps/websites/services/domains'
import Domain from '@apps/websites/models/domain'
import socket from '@core/services/routes/emitter'

const dnsRoute = async (req, res) => {

  const domain = await Domain.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!domain) return res.status(404).respond({
    code: 404,
    message: 'Unable to load domain'
  })

  await checkNameservers(req, {
    domain,
    queue: false
  })

  await socket.refresh(req, [
    '/admin/websites/domains',
    `/admin/websites/domains/${domain.get('id')}`
  ])

  await res.status(200).respond(true)

}

export default dnsRoute
