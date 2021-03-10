import SiteSerializer from '@apps/sites/serializers/site_serializer'
import Site from '@apps/sites/models/site'

const listRoute = async (req, res) => {

  const sites = await Site.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort,
      defaults: 'title',
      allowed: ['title']
    },
    page: req.query.$page,
    withRelated: ['origins'],
    transacting: req.trx
  })

  await res.status(200).respond(sites, SiteSerializer)

}

export default listRoute
