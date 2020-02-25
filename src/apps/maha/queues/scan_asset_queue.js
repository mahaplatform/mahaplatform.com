import { scanAsset } from '../services/assets'
import Queue from '../../../core/objects/queue'

const processor = async (req, job) => {
  await scanAsset(req, job.data.id)
}

const ProcessAssetQueue = new Queue({
  name: 'scan_asset',
  processor
})

export default ProcessAssetQueue
