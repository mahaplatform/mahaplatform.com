import { createDistribution } from '@core/services/aws/cloudfront'
import Queue from '@core/objects/queue'

const processor = async (req, job) => {

  const distribution = await createDistribution(req, {
    code: 'abcdef',
    aliases: [],
    aws_certificate_arn: 'arn:aws:acm:us-east-1:927906310648:certificate/ab67bf57-da6e-47a8-ac13-b9369403537d'
  })

}

const createDistributionQueue = new Queue({
  queue: 'worker',
  name: 'create_distribution',
  processor
})

export default createDistributionQueue
