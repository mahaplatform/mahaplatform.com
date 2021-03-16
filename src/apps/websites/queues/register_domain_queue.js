import CheckRegistrantQueue from '@apps/websites/queues/check_registrant_queue'
import { registerDomain } from '@apps/websites/services/domains'
import Domain from '@apps/websites/models/domain'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const domain = await Domain.query(qb => {
    qb.where('id', job.data.domain_id)
  }).fetch({
    transacting: req.trx
  })

  const registration = await registerDomain(req, {
    name: domain.get('name'),
    admin_contact: domain.get('admin_contact'),
    registrant_contact: domain.get('registrant_contact'),
    tech_contact: domain.get('tech_contact')
  })

  await domain.save({
    aws_operation_id: registration.aws_operation_id,
    registration_status: 'inprogress'
  }, {
    transacting: req.trx,
    patch: true
  })

  await CheckRegistrantQueue.enqueue(req, {
    domain_id: domain.get('id')
  }, {
    delay: 5 * 60 * 1000
  })

}

const RegisterDomainQueue = new Queue({
  queue: 'worker',
  name: 'register_domain',
  processor
})

export default RegisterDomainQueue
