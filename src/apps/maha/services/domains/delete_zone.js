import { route53 } from '@core/services/aws'

const deleteZone = async (req, { aws_zone_id }) => {

  await route53.deleteHostedZone({
    Id: aws_zone_id
  }).promise()

  return true

}

export default deleteZone
