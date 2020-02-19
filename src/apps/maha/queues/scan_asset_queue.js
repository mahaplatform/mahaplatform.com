import { scanAsset } from '../services/assets'
import Queue from '../../../core/objects/queue'

const enqueue = async (req, asset_id) => ({ asset_id })

const processor = async (req, job) => {
  await scanAsset(req, job.data.asset_id)
}

const ProcessAssetQueue = new Queue({
  name: 'scan_asset',
  enqueue,
  processor
})

export default ProcessAssetQueue
