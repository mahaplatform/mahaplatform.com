import { processAsset } from '../services/assets'
import Queue from '../../../core/objects/queue'

const enqueue = async (req, job) => job

const processor = async (job, trx) => {

  await processAsset({ trx }, job.data.id)

}

const ProcessAssetQueue = new Queue({
  name: 'process_asset',
  enqueue,
  processor
})

export default ProcessAssetQueue
