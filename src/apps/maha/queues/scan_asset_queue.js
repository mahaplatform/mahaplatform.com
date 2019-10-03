import { scanAsset } from '../services/assets'
import Queue from '../../../web/core/objects/queue'

const enqueue = async (req, asset_id) => ({ asset_id })

const processor = async (job, trx) => {

  await scanAsset({ trx }, job.data.asset_id)

}

const processAssetQueue = new Queue({
  name: 'scan_asset',
  enqueue,
  processor
})

export default processAssetQueue
