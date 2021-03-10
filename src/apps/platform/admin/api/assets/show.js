import ProcessAssetQueue from '@apps/maha/queues/process_asset_queue'
import AssetSerializer from '@apps/platform/serializers/asset_serializer'
import Asset from '@apps/maha/models/asset'

const showRoute = async (req, res) => {

  const asset = await Asset.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    withRelated: ['user.photo'],
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

  await res.status(200).respond(asset, AssetSerializer)

}

export default showRoute
