import SiteSerializer from '@apps/sites/serializers/site_serializer'
import Site from '@apps/sites/models/site'

const showRoute = async (req, res) => {

  const site = await Site.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['origins'],
    transacting: req.trx
  })

  if(!site) return res.status(404).respond({
    code: 404,
    message: 'Unable to load site'
  })

  res.status(200).respond(site, SiteSerializer)

}

export default showRoute
