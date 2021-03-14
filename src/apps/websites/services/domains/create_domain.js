import RegisterDomainQueue from '@apps/websites/queues/register_domain_queue'
import TransferDomainQueue from '@apps/websites/queues/transfer_domain_queue'
import Domain from '@apps/websites/models/domain'

const createDomain = async (req, params) => {

  const { name, type } = params

  const domain = await Domain.forge({
    team_id: req.team.get('id'),
    name,
    is_primary,
    is_system,
    config: { zone }
  }).save(null, {
    transacting: req.trx
  })

  // create route53 zone

  if(type === 'regster') {

    await domain.save({
      status: 'registering',
      registration_status: 'pending'
    }, {
      transacting: req.trx
    })

    await RegisterDomainQueue.enqueue(req, {
      domain_id: domain.get('id')
    })

  }

  if(type === 'transfer') {

    await domain.save({
      status: 'transfering',
      transfer_status: 'pending'
    }, {
      transacting: req.trx
    })

    await TransferDomainQueue.enqueue(req, {
      domain_id: domain.get('id')
    })

  }

  return domain

}

export default createDomain
