import SetupDomainQueue from '@apps/websites/queues/setup_domain_queue'
import Domain from '@apps/websites/models/domain'
import createZone from './create_zone'

const createDomain = async (req, params) => {

  const { name, type } = params

  const domain = await Domain.forge({
    team_id: req.team.get('id'),
    type,
    name,
    is_primary: false
  }).save(null, {
    transacting: req.trx
  })

  if(type === 'registration') {

    await domain.save({
      auto_renew: true,
      is_locked: true,
      status: 'registering',
      registration_status: 'pending'
    }, {
      transacting: req.trx,
      patch: true
    })

    await SetupDomainQueue.enqueue(req, {
      domain_id: domain.get('id'),
      action: 'register_domain'
    })

  } else if(type === 'transfer') {

    await domain.save({
      auto_renew: true,
      is_locked: true,
      status: 'transfering',
      transfer_status: 'pending'
    }, {
      transacting: req.trx,
      patch: true
    })

    await SetupDomainQueue.enqueue(req, {
      domain_id: domain.get('id'),
      action: 'transfer_domain'
    })

  } else if (type === 'dns') {

    await createZone(req, {
      domain
    })

  }

  return domain

}

export default createDomain
