import AssetSerializer from '../../../../serializers/asset_serializer'
import Asset from '../../../../models/asset'

const listRoute = async (req, res) => {

  const assets = await Asset.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    searchParams: ['first_name','last_name','email']
  }).sort({
    sort: req.query.$sort
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['source','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(assets, AssetSerializer)

}

export default listRoute
