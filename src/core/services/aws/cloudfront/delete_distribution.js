import { cloudfront } from '@core/vendor/aws'

const deleteDistibution = async (req, { aws_cloudfront_id }) => {

  const config = await cloudfront.getDistributionConfig({
    Id: aws_cloudfront_id
  }).promise()

  config.DistributionConfig.Enabled = false

  const result = await cloudfront.updateDistribution({
    DistributionConfig: config.DistributionConfig,
    Id: aws_cloudfront_id,
    IfMatch: config.ETag
  }).promise()

  await cloudfront.waitFor('distributionDeployed', {
    Id: aws_cloudfront_id
  }).promise()

  await cloudfront.deleteDistribution({
    Id: aws_cloudfront_id,
    IfMatch: result.ETag
  }).promise()

  return true

}

export default deleteDistibution
