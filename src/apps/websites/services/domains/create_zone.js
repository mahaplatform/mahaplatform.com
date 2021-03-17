import * as route53 from '@core/services/aws/route53'
import setupZone from './setup_zone'

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

  await setupZone(req, {
    domain
  })

}

export default createZone
