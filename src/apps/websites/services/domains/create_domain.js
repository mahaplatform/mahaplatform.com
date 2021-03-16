import ConfirmNameserversQueue from '@apps/websites/queues/confirm_nameservers_queue'
import RegisterDomainQueue from '@apps/websites/queues/register_domain_queue'
import TransferDomainQueue from '@apps/websites/queues/transfer_domain_queue'
import { createZone } from '@core/services/aws/route53'
import Domain from '@apps/websites/models/domain'
import Record from '@apps/websites/models/record'

const createDomain = async (req, params) => {

  const { name, type } = params

  const domain = await Domain.forge({
    team_id: req.team.get('id'),
    type,
    name,
    is_primary: false,
    is_system: false
  }).save(null, {
    transacting: req.trx
  })

  if(type === 'regster') {

    await domain.save({
      status: 'registering',
      registration_status: 'pending'
    }, {
      transacting: req.trx,
      patch: true
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
      transacting: req.trx,
      patch: true
    })

    await TransferDomainQueue.enqueue(req, {
      domain_id: domain.get('id')
    })

  }

  const zone = await createZone(req, {
    name
  })

  await domain.save({
    aws_zone_id: zone.aws_zone_id,
    dns_status: 'pending'
  }, {
    transacting: req.trx,
    patch: true
  })

  await Promise.map(zone.records, async (record) => {
    await Record.forge({
      team_id: req.team.get('id'),
      domain_id: domain.get('id'),
      is_system: true,
      name: record.name,
      type: record.type,
      ttl: record.ttl,
      alias: record.alias,
      value: record.value
    }).save(null, {
      transacting: req.trx
    })
  })

  await ConfirmNameserversQueue.enqueue(req, {
    domain_id: domain.get('id')
  })

  return domain

}

export default createDomain
