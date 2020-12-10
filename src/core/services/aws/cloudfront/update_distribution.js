import { cloudfront } from '@core/vendor/aws'

const updateDistibution = async (req, params) => {

  const { aws_cloudfront_id, aliases, aws_certificate_arn, name } = params

  const config = await cloudfront.getDistributionConfig({
    Id: aws_cloudfront_id
  }).promise()

  if(aliases) {
    config.DistributionConfig.Aliases = {
      Quantity: aliases.length + 1,
      Items: [
        name,
        ...aliases || []
      ]
    }
  }

  if(aws_certificate_arn) {
    config.DistributionConfig.ViewerCertificate = {
      ACMCertificateArn: aws_certificate_arn,
      CloudFrontDefaultCertificate: false,
      MinimumProtocolVersion: 'TLSv1.2_2019',
      SSLSupportMethod: 'sni-only'
    }
  }

  await cloudfront.updateDistribution({
    DistributionConfig: config.DistributionConfig
  }).promise()

  await cloudfront.waitFor('distributionDeployed', {
    Id: aws_cloudfront_id
  }).promise()

  return true

}

export default updateDistibution
