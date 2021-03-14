import { transferDomain } from '@apps/websites/services/domains'
import Domain from '@apps/websites/models/domain'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const domain = await Domain.query(qb => {
    qb.where('id', job.data.domain_id)
  }).fetch({
    transacting: req.trx
  })

  const transfer = await transferDomain(req, {
    name: domain.get('name'),
    auth_code: domain.get('auth_code'),
    auto_renew: domain.get('auto_renew'),
    duration: domain.get('duration'),
    admin: domain.get('admin_contact'),
    registrant: domain.get('registrant_contact'),
    tech: domain.get('tech_contact')
  })

  await domain.save({
    aws_transfer_id: transfer.aws_transfer_id,
    transfer_status: 'inprogress'
  }, {
    transacting: req.trx,
    patch: true
  })

}

const TransferDomainQueue = new Queue({
  queue: 'worker',
  name: 'transfer_domain',
  processor
})

export default TransferDomainQueue
