import { assembleAssetQueue, processAssetQueue } from '../../../../maha/services/asset'
import AssetSerializer from '../../../serializers/asset_serializer'
import Asset from '../../../../maha/models/asset'

const showRoute = async (req, res) => {

  const asset = await Asset.query(qb => {
    qb.where('code', req.params.code)
  }).fetch({
    withRelated: ['source','user.photo'],
    transacting: req.trx
  })

  if(!asset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load asset'
  })

  if(asset.get('status') === 'chunked') {
    await assembleAssetQueue.enqueue(req, req.params.id)
  }

  if(asset.get('status') === 'assembled') {
    await processAssetQueue.enqueue(req, req.params.id)
  }

  res.status(200).respond(asset, AssetSerializer)

}

export default showRoute
