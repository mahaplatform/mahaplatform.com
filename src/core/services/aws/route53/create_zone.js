import { route53 } from '@core/vendor/aws'
import moment from 'moment'

const createZone = async (req, { name }) => {

  const result = await route53.createHostedZone({
    Name: name,
    CallerReference: moment().format('x')
  }).promise()

  return {
    aws_zone_id: result.Id
  }

}

export default createZone
