import * as route53 from '@core/services/aws/route53'

const createZone = async (req, { domain }) => {

  const zone = await route53.createZone(req, {
    name
  })

  await route53.createRecords(req, {
    aws_zone_id: zone.aws_zone_id
  })

  await domain.save({
    aws_zone_id: zone.aws_zone_id,
    status: 'mapping',
    dns_status: 'pending'
  }, {
    transacting: req.trx,
    patch: true
  })

}

export default createZone
