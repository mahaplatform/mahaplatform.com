import AssetSerializer from '../../../serializers/asset_serializer'
import Asset from '../../../models/asset'

const route = async (req, res) => {

  const asset = await Asset.query(qb => {
    qb.where('id', req.params.id )
  }).fetch({
    withRelated: ['source','user.photo'],
    transacting: req.trx
  })

  if(!asset) return res.status(404).json({
    message: 'Unable to find asset'
  })

  const data = AssetSerializer(req, req.trx, asset)

  res.status(200).respond(data)

}

export default route
