import DomainSerializer from '@apps/maha/serializers/domain_serializer'
import Domain from '@apps/maha/models/domain'

const listRoute = async (req, res) => {

  const domains = await Domain.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['program_id','status']
    },
    sort: {
      params: req.query.$sort,
      defaults:  'name'
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(domains, DomainSerializer)

}

export default listRoute
