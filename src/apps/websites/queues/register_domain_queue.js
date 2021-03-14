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
    auto_renew: domain.get('auto_renew'),
    duration: domain.get('duration'),
    admin: domain.get('admin_contact'),
    registrant: domain.get('registrant_contact'),
    tech: domain.get('tech_contact')
  })

  await domain.save({
    aws_registration_id: registration.aws_registration_id,
    registration_status: 'inprogress'
  }, {
    transacting: req.trx,
    patch: true
  })

}

const RegisterDomainQueue = new Queue({
  queue: 'worker',
  name: 'register_domain',
  processor
})

export default RegisterDomainQueue
