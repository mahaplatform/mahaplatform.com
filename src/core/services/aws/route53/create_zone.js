import { route53 } from '@core/vendor/aws'
import moment from 'moment'

const createZone = async (req, { name }) => {

  const result = await route53.createHostedZone({
    Name: name,
    CallerReference: moment().format('x')
  }).promise()

  const aws_zone_id = result.HostedZone.Id.replace('/hostedzone/', '')

  const records = await route53.listResourceRecordSets({
    HostedZoneId: aws_zone_id
  }).promise()

  const soa = records.ResourceRecordSets.find(recordset => {
    return recordset.Type === 'SOA'
  })

  const ns = records.ResourceRecordSets.find(recordset => {
    return recordset.Type === 'NS'
  })

  return {
    aws_zone_id,
    records: [
      {
        name: null,
        type: soa.Type,
        ttyl: soa.TTL,
        records: soa.ResourceRecords.map(record => ({
          value: record.Value
        }))
      },
      {
        name: null,
        type: ns.Type,
        ttyl: ns.TTL,
        records: ns.ResourceRecords.map(record => ({
          value: record.Value
        }))
      }
    ]
  }

}

export default createZone
