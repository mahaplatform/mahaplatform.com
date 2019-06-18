import { processAsset } from '../services/asset'
import Queue from '../../../core/objects/queue'

const enqueue = async (req, asset_id) => ({ asset_id })

const processor = async (job, trx) => {

  await processAsset(job.data.asset_id, trx)

}

const processAssetQueue = new Queue({
  name: 'process_asset',
  enqueue,
  processor
})

export default processAssetQueue
