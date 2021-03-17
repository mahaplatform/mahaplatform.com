import { checkNameservers, checkOperation } from '@apps/websites/services/domains'
import Domain from '@apps/websites/models/domain'

const checkRoute = async (req, res) => {

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

  if(domain.get('type') === 'dns') {
    await checkNameservers(req, {
      domain,
      queue: false
    })
  } else {
    await checkOperation(req, {
      domain,
      queue: false
    })
  }

  await res.status(200).respond(true)

}

export default checkRoute
