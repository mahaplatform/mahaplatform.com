import AssetSerializer from '@apps/platform/serializers/asset_serializer'
import Asset from '@apps/maha/models/asset'

const listRoute = async (req, res) => {

  const assets = await Asset.filterFetch({
    filter: {
      params: req.query.$filter,
      search: ['original_file_name'],
      allowed: ['user_id','source','team_id','status']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['user.photo'],
    transacting: req.trx
  })

  await res.status(200).respond(assets, AssetSerializer)

}

export default listRoute
