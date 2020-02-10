import ProcessAssetQueue from '../../../../maha/queues/process_asset_queue'
import Asset from '../../../../maha/models/asset'

const reprocessRoute = async (req, res) => {

  const asset = await Asset.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!asset) return res.status(404).respond({
    code: 404,
    message: 'Unable to load asset'
  })

  await ProcessAssetQueue.enqueue(req, {
    id: asset.get('id')
  })

  res.status(200).respond(true)

}

export default reprocessRoute
