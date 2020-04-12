import { scanAsset } from '../services/assets'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {
  console.log(job.data)
  await scanAsset(req, job.data.id)
}

const ScanAssetQueue = new Queue({
  name: 'scan_asset',
  processor
})

export default ScanAssetQueue
