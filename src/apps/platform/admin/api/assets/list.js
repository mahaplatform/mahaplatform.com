import AssetSerializer from '../../../serializers/asset_serializer'
import Asset from '../../../../maha/models/asset'

const listRoute = async (req, res) => {

  const assets = await Asset.filterFetch({
    filter: {
      params: req.query.$filter,
      allowed: ['user_id','source_id','team_id','status']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['source','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(assets, AssetSerializer)

}

export default listRoute
