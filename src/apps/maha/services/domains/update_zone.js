import { route53 } from '@core/services/aws'

const updateZone = async (req, { aws_zone_id, zone }) => {

  const records = await route53.listResourceRecordSets(({
    HostedZoneId: aws_zone_id
  })).promise().then(result => result.ResourceRecordSets.map(record => ({
    name: record.Name,
    type: record.Type,
    ttl: record.TTL
  })))

  const zone = await route53.changeResourceRecordSets(({
    HostedZoneId: aws_zone_id,
    ChangeBatch: {
      Changes: [

      ]
    }
  })).promise()

  return true

}

export default updateZone
