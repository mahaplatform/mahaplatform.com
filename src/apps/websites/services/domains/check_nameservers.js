import SetupDomainQueue from '@apps/websites/queues/setup_domain_queue'
import Record from '@apps/websites/models/record'
import { lookup } from '@core/services/dns'

const checkNameservers = async (req, { domain }) => {

  const record = await Record.query(qb => {
    qb.where('domain_id', domain.get('id'))
    qb.where('type', 'NS')
  }).fetch({
    transacting: req.trx
  })

  const nameservers = await lookup({
    name: domain.get('name'),
    type: 'NS'
  })

  const mapped = record.get('records').find(record => {
    return nameservers.find(nameserver => {
      return `${nameserver}.` === record.value
    }) === undefined
  }) === undefined

  if(!mapped) {
    return await SetupDomainQueue.enqueue(req, {
      domain_id: domain.get('id'),
      action: 'check_nameservers'
    }, {
      delay: 60 * 60 * 1000
    })
  }

  await domain.save({
    dns_status: 'success',
    status: 'active'
  }, {
    transacting: req.trx,
    patch: true
  })

}

export default checkNameservers
