import AssetSerializer from '../../../serializers/asset_serializer'
import Asset from '../../../models/asset'

const route = async (req, res) => {

  const asset = await Asset.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    withRelated: ['source','user.photo'],
    transacting: req.trx
  })

  if(!asset) return res.status(404).json({
    code: 404,
    message: 'Unable to find asset'
  })

  res.status(200).respond(asset, (asset) => {
    return AssetSerializer(req, asset)
  })

}

export default route
