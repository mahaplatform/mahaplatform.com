import { route53 } from '@core/vendor/aws'

const createZone = async (req, { name }) => {

  const zone = await route53.createHostedZone({
    Name: name
  }).promise()

  return {
    aws_zone_id: zone.Id
  }

}

export default createZone
