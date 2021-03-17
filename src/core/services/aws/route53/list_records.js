import { route53 } from '@core/vendor/aws'

const listRecords = async ({ name, aws_zone_id }) => {

  const records = await route53.listResourceRecordSets({
    HostedZoneId: aws_zone_id
  }).promise()

  return records.ResourceRecordSets.map(record => {
    const subdomain = record.Name
    return {
      name: subdomain.length > 0 ? subdomain: null,
      type: record.Type,
      ttl: record.TTL,
      alias: record.AliasTarget ? record.AliasTarget.map(alias => ({
        value: alias.DNSName
      })) : null,
      records: record.ResourceRecords ? record.ResourceRecords.map(record => ({
        value: record.Value
      })) : null
    }
  })

}

export default listRecords
