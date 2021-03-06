import SetupDomainQueue from '@apps/websites/queues/setup_domain_queue'
import { listRecords } from '@core/services/aws/route53'
import socket from '@core/services/routes/emitter'
import { lookup } from '@core/services/dns'

const checkNameservers = async (req, { domain, queue = true }) => {

  const records = await listRecords({
    aws_zone_id: domain.get('aws_zone_id'),
    name: domain.get('name')
  })

  const ns = records.find(record => {
    return record.type === 'NS'
  })

  const nameservers = await lookup({
    name: domain.get('name'),
    type: 'NS'
  })

  const mapped = ns.records.find(record => {
    return nameservers.find(nameserver => {
      return `${nameserver}.` === record.value
    }) === undefined
  }) === undefined

  if(mapped) {

    await domain.save({
      dns_status: 'success',
      status: 'active'
    }, {
      transacting: req.trx,
      patch: true
    })

    await socket.refresh(req, [
      '/admin/websites/domains',
      `/admin/websites/domains/${domain.get('id')}`
    ])

  }

  if(queue) {
    await SetupDomainQueue.enqueue(req, {
      domain_id: domain.get('id'),
      action: 'check_nameservers'
    }, {
      delay: 60 * 60 * 1000
    })
  }

}

export default checkNameservers
