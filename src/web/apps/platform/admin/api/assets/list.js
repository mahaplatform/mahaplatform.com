import AssetSerializer from '../../../serializers/asset_serializer'
import Asset from '../../../../maha/models/asset'

const listRoute = async (req, res) => {

  const assets = await Asset.filter({
    filter: req.query.$filter,
    filterParams: ['user_id','source_id','team_id','status']
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-created_at',
    sortParams: ['created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['source','user.photo'],
    transacting: req.trx
  })

  res.status(200).respond(assets, (asset) => {
    return AssetSerializer(req, asset)
  })

}

export default listRoute
