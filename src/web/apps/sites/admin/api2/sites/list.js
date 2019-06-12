import SiteSerializer from '../../../serializers/site_serializer'
import Site from '../../../models/site'

const listRoute = async (req, res) => {

  const sites = await Site.query(qb => {
    qb.where('team_id', req.team.get('id'))
  }).filter({
    filter: req.query.$filter
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'title',
    sortParams: ['title']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['origins'],
    transacting: req.trx
  })

  res.status(200).respond(sites, (site) => {
    return SiteSerializer(req, req.trx, site)
  })

}

export default listRoute
