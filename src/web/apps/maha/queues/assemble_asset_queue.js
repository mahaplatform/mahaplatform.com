import { assembleAsset } from '../services/assets'
import Queue from '../../../core/objects/queue'

const enqueue = async (req, asset_id) => ({ asset_id })

const processor = async (job, trx) => {

  await assembleAsset({ trx }, job.data.asset_id)

}

const assembleAssetQueue = new Queue({
  name: 'assemble_asset',
  enqueue,
  processor
})

export default assembleAssetQueue
