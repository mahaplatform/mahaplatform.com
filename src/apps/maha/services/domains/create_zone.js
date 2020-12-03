import { route53 } from '@core/services/aws'

const createZone = async (req, { name }) => {

  const zone = await route53.createHostedZone({
    Name: name
  }).promise()

  return {
    aws_zone_id: zone.Id
  }

}

export default createZone
