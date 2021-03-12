import { createDistribution } from '@core/services/aws/cloudfront'
import Domain from '@apps/websites/models/domain'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const website = await Domain.query(qb => {
    qb.where('id', job.datas.id)
  }).fetch({
    transacting: req.trx
  })

  await createZone(req, {
    website
  })

}

const CreateZoneQueue = new Queue({
  queue: 'worker',
  name: 'create_zone',
  processor
})

export default CreateZoneQueue
