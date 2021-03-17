import SetupDomainQueue from '@apps/websites/queues/setup_domain_queue'
import { createZone } from '@core/services/aws/route53'
import Domain from '@apps/websites/models/domain'

const createDomain = async (req, params) => {

  const { admin_contact, name, registrant_contact, tech_contact, type } = params

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
      admin_contact,
      registrant_contact,
      tech_contact,
      status: 'registering',
      registration_status: 'pending',
      registrant_status: 'pending'
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
      admin_contact,
      registrant_contact,
      tech_contact,
      status: 'transfering',
      transfer_status: 'pending',
      registrant_status: 'pending'
    }, {
      transacting: req.trx,
      patch: true
    })

    await SetupDomainQueue.enqueue(req, {
      domain_id: domain.get('id'),
      action: 'transfer_domain'
    })

  } else if (type === 'dns') {

    const zone = await createZone(req, {
      name: domain.get('name')
    })

    await domain.save({
      aws_zone_id: zone.aws_zone_id,
      status: 'mapping',
      dns_status: 'pending'
    }, {
      transacting: req.trx,
      patch: true
    })

    await SetupDomainQueue.enqueue(req, {
      domain_id: domain.get('id'),
      action: 'create_zone'
    })

  }

  return domain

}

export default createDomain
