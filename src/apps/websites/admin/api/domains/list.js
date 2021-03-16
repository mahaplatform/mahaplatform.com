import DomainSerializer from '@apps/websites/serializers/domain_serializer'
import Domain from '@apps/websites/models/domain'

const listRoute = async (req, res) => {

  const domain = await Domain.filterFetch({
    scope: qb => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['id']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'name'
    },
    page: req.query.$page,
    transacting: req.trx
  })

  await res.status(200).respond(domain, DomainSerializer)

}

export default listRoute
