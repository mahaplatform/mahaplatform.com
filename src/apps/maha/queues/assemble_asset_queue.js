import { assembleAsset } from '../services/asset'
import Queue from '../core/objects/queue'

const enqueue = async (req, trx, asset_id) => {

  return { asset_id }

}

const processor = async (job, trx) => {

  await assembleAsset(job.data.asset_id, trx)

}

const assembleAssetQueue = new Queue({
  name: 'assemble_asset',
  enqueue,
  processor
})

export default assembleAssetQueue
