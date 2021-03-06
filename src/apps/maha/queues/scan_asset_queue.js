import { scanAsset } from '../services/assets'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {
  await scanAsset(req, job.data.id)
}

const ScanAssetQueue = new Queue({
  queue: 'worker',
  name: 'scan_asset',
  processor
})

export default ScanAssetQueue
