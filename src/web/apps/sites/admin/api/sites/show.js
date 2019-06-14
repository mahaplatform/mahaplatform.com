import SiteSerializer from '../../../serializers/site_serializer'
import Site from '../../../models/site'

const showRoute = async (req, res) => {

  const site = await Site.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['origins'],
    transacting: req.trx
  })

  if(!site) return req.status(404).respond({
    code: 404,
    message: 'Unable to load site'
  })

  res.status(200).respond(site, SiteSerializer)

}

export default showRoute
