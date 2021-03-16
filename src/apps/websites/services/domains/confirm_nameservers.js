import Record from '@apps/websites/models/record'
import { lookup } from '@core/services/dns'

const confirmNameservers = async (req, { domain }) => {

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

  const mapped = record.get('value').records.find(record => {
    return nameservers.find(nameserver => {
      return nameserver === record
    }) === undefined
  }) === undefined

  if(mapped) {
    await domain.save({
      dns_status: 'success'
    })
  }

}

export default confirmNameservers
