import * as cloudfront from '@core/services/aws/cloudfront'
import * as route53 from '@core/services/aws/route53'

const createDistribution = async (req, { website }) => {

  const distribution = await cloudfront.createDistribution(req, {
    code: website.get('code'),
    aliases: [
      `${website.get('slug')}.mahaplatform.com`
    ]
  })

  await route53.createRecords(req, {
    aws_zone_id: process.env.AWS_ZONE_ID,
    records: [{
      type: 'ALIAS',
      name: website.get('slug'),
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
