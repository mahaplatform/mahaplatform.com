import DomainSerializer from '@apps/maha/serializers/domain_serializer'
import Domain from '@apps/maha/models/domain'

const showRoute = async (req, res) => {

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

  res.status(200).respond(domain, DomainSerializer)

}

export default showRoute
