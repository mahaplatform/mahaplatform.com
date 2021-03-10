import AssetSerializer from '@apps/maha/serializers/asset_serializer'
import Asset from '@apps/maha/models/asset'

const listRoute = async (req, res) => {

  const assets = await Asset.filterFetch({
    filter: {
      params: req.query.$filter
    },
    sort: {
      params: req.query.$sort
    },
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  await res.status(200).respond(assets, AssetSerializer)

}


export default listRoute
