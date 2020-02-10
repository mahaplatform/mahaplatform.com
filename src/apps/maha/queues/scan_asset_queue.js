import { scanAsset } from '../services/assets'
import Queue from '../../../core/objects/queue'

const enqueue = async (req, asset_id) => ({ asset_id })

const processor = async (job, trx) => {

  await scanAsset({ trx }, job.data.asset_id)

}

const ProcessAssetQueue = new Queue({
  name: 'scan_asset',
  enqueue,
  processor
})

export default ProcessAssetQueue
