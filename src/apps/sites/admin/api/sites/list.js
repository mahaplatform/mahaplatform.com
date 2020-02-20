import SiteSerializer from '../../../serializers/site_serializer'
import Site from '../../../models/site'

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

  res.status(200).respond(sites, SiteSerializer)

}

export default listRoute
