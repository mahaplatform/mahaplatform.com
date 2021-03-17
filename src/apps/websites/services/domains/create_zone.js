import SetupDomainQueue from '@apps/websites/queues/setup_domain_queue'
import * as route53 from '@core/services/aws/route53'

const createZone = async (req, { domain }) => {

  const zone = await route53.createZone(req, {
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
    action: 'check_nameservers'
  }, {
    delay: 60 * 60 * 1000
  })

}

export default createZone
