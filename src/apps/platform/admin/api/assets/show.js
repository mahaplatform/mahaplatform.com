import ProcessAssetQueue from '../../../../maha/queues/process_asset_queue'
import AssetSerializer from '../../../serializers/asset_serializer'
import Asset from '../../../../maha/models/asset'

const showRoute = async (req, res) => {

  const asset = await Asset.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['source','user.photo'],
    transacting: req.trx
  })

  if(!asset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load asset'
  })

  if(asset.get('status') === 'assembled') {
    await ProcessAssetQueue.enqueue(req, {
      id: req.params.id
    })
  }

  res.status(200).respond(asset, AssetSerializer)

}

export default showRoute
