import { setupZone } from '@apps/websites/services/domains'
import Domain from '@apps/websites/models/domain'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const domain = await Domain.query(qb => {
    qb.where('id', job.data.domain_id)
  }).fetch({
    transacting: req.trx
  })

  await setupZone(req, {
    domain
  })

}

const SetupZoneQueue = new Queue({
  queue: 'worker',
  name: 'setup_zone',
  processor
})

export default SetupZoneQueue
