import { confirmNameservers } from '@apps/websites/services/domains'
import Domain from '@apps/websites/models/domain'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const domain = await Domain.query(qb => {
    qb.where('id', job.data.domain_id)
  }).fetch({
    transacting: req.trx
  })

  await confirmNameservers(req, {
    domain
  })

}

const ConfirmNameserversQueue = new Queue({
  queue: 'worker',
  name: 'confirm_nameservers',
  processor
})

export default ConfirmNameserversQueue
