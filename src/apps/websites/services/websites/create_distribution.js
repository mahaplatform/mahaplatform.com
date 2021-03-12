import * as cloudfront from '@core/services/aws/cloudfront'
import * as route53 from '@core/services/aws/route53'

const createDistribution = async (req, { website }) => {

  await website.load(['system_domain'], {
    transacting: req.trx
  })

  const system_domain = website.related('system_domain')

  const distribution = await cloudfront.createDistribution(req, {
    code: website.get('code'),
    aliases: [
      system_domain.get('name')
    ]
  })

  await route53.createRecords(req, {
    aws_zone_id: process.env.AWS_ZONE_ID,
    records: [{
      type: 'ALIAS',
      name: system_domain.get('name'),
      value: `${distribution.aws_cloudfront_subdomain}.cloudfront.net`
    }]
  })

  await website.save({
    aws_cloudfront_id: distribution.aws_cloudfront_id,
    aws_cloudfront_subdomain: distribution.aws_cloudfront_subdomain
  }, {
    transacting: req.trx,
    patch: true
  })

}

export default createDistribution
