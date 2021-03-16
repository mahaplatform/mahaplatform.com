import { registerDomain } from '@apps/websites/services/domains'
import Domain from '@apps/websites/models/domain'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const domain = await Domain.query(qb => {
    qb.where('id', job.data.domain_id)
  }).fetch({
    transacting: req.trx
  })

  await registerDomain(req, {
    domain
  })

}

const RegisterDomainQueue = new Queue({
  queue: 'worker',
  name: 'register_domain',
  processor
})

export default RegisterDomainQueue
