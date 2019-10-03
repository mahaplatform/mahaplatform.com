import { processAsset } from '../services/assets'
import Queue from '../../../web/core/objects/queue'

const enqueue = async (req, asset_id) => ({ asset_id })

const processor = async (job, trx) => {

  await processAsset({ trx }, job.data.asset_id)

}

const processAssetQueue = new Queue({
  name: 'process_asset',
  enqueue,
  processor
})

export default processAssetQueue
