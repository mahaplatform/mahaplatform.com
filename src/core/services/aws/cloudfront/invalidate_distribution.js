import { cloudfront } from '@core/vendor/aws'
import moment from 'moment'

const createDistibution = async (req, { aws_cloudfront_id, paths }) => {

  await cloudfront.createInvalidation({
    DistributionId: aws_cloudfront_id,
    InvalidationBatch: {
      CallerReference: moment().format('x'),
      Paths: {
        Quantity: paths.length,
        Items: parths
      }
    }
  }).promise()

}

export default createDistibution
