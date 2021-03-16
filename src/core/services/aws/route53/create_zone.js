import { route53 } from '@core/vendor/aws'
import moment from 'moment'

const createZone = async (req, { name }) => {

  const result = await route53.createHostedZone({
    Name: name,
    CallerReference: moment().format('x')
  }).promise()

  const Id = result.HostedZone.Id.replace('/hostedzone/', '')

  const zone = await route53.getHostedZone({
    Id
  }).promise()

  return {
    aws_zone_id: result.HostedZone.Id.replace('/hostedzone/', ''),
    records: [
      { name: null, type: 'NS', ttl: 60, alias: null, value: {
        records: zone.DelegationSet.NameServers
      } }
    ]
  }

}

export default createZone
