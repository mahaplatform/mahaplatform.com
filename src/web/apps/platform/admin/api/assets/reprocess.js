import { assembleAssetQueue, processAssetQueue } from '../../../../maha/services/assets'
import Asset from '../../../../maha/models/asset'

const reprocessRoute = async (req, res) => {

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
  const queue = asset.get('status') === 'chunked' ? assembleAssetQueue : processAssetQueue

  await queue.enqueue(null, req.params.id)

  res.status(200).respond(true)

}

export default reprocessRoute
