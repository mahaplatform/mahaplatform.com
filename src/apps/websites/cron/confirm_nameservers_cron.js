import { confirmNameservers } from '@apps/websites/services/domains'
import Domain from '@apps/websites/models/domain'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const domains = await Domain.query(qb => {
    qb.where('dns_status', 'pending')
  }).fetchAll({
    transacting: req.trx
  })

  await Promise.mapSeries(domains, async(domain) => {
    await confirmNameservers(req, {
      domain
    })
  })

}

const ConfirmNameserversCron = new Queue({
  queue: 'cron',
  name: 'confirm_nameservers',
  cron: '0 * * * * *',
  processor
})

export default ConfirmNameserversCron
