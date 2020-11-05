import { processAsset } from '../services/assets'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {
  await processAsset(req, job.data.id)
}

const ProcessAssetQueue = new Queue({
  name: 'process_asset',
  processor
})

export default ProcessAssetQueue
