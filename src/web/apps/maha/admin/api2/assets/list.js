import AssetSerializer from '../../../serializers/asset_serializer'
import Asset from '../../../models/asset'

const listRoute = async (req, res) => {

  const assets = await Asset.filter({
    filter: req.query.$filter,
    searchParams: ['first_name','last_name','email']
  }).sort({
    sort: req.query.$sort
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['source','user.photo'],
    transacting: req.trx
  })

  const data = assets.map(asset => {
    return AssetSerializer(req, req.trx, asset)
  })

  res.status(200).respond(data)

}

export default listRoute
