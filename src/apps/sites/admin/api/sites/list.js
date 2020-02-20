import SiteSerializer from '../../../serializers/site_serializer'
import Site from '../../../models/site'

const listRoute = async (req, res) => {

  const sites = await Site.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['title']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['origins'],
    transacting: req.trx
  })

  res.status(200).respond(sites, SiteSerializer)

}

export default listRoute
