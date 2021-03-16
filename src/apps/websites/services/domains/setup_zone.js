import CheckNameserversQueue from '@apps/websites/queues/check_nameservers_queue'
import { listRecords } from '@core/services/aws/route53'
import Record from '@apps/websites/models/record'

const setupZone = async (req, { domain }) => {

  const records = await listRecords(req, {
    name: domain.get('name'),
    aws_zone_id: domain.get('aws_zone_id')
  })

  await Promise.map(records, async (record) => {
    await Record.forge({
      team_id: req.team.get('id'),
      domain_id: domain.get('id'),
      is_system: true,
      name: record.name,
      type: record.type,
      ttl: record.ttl,
      alias: record.alias,
      records: record.records
    }).save(null, {
      transacting: req.trx
    })
  })

  if(domain.get('type') === 'dns') {
    await domain.save({
      dns_status: 'inprogress'
    }, {
      transacting: req.trx,
      patch: true
    })

    await CheckNameserversQueue.enqueue(req, {
      domain_id: domain.get('id')
    }, {
      delay: 5 * 60 * 1000
    })
  } else {
    await domain.save({
      status: 'active'
    }, {
      transacting: req.trx,
      patch: true
    })
  }

}

export default setupZone
