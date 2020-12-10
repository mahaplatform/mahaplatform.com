import { cloudfront } from '@core/vendor/aws'

const updateDistibution = async (req, params) => {

  const { aws_cloudfront_id, aliases, aws_certificate_arn } = params

  const config = await cloudfront.getDistributionConfig({
    Id: aws_cloudfront_id
  }).promise()

  if(aliases) {
    config.Aliases = {
      Quantity: aliases.length + 1,
      Items: [
        name,
        ...aliases || []
      ]
    }
  }

  if(aws_certificate_arn) {
    config.ViewerCertificate = {
      ACMCertificateArn: aws_certificate_arn,
      CloudFrontDefaultCertificate: false,
      MinimumProtocolVersion: 'TLSv1.2_2019',
      SSLSupportMethod: 'sni-only'
    }
  }

  await cloudfront.updateDistribution(config).promise()

}

export default updateDistibution
