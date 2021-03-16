import { route53 } from '@core/vendor/aws'

const deleteRecords = async (req, { aws_zone_id, records }) => {

  await route53.changeResourceRecordSets({
    ChangeBatch: {
      Changes: records.map(record => ({
        Action: 'DELETE',
        ResourceRecordSet: {
          Name: record.name,
          Type: record.type,
          TTL: record.ttl,
          ...record.alias ? {
            AliasTarget: record.alias
          } : {
            ResourceRecords: record.records.map(r => ({
              Value: r.value
            }))
          }
        }
      }))
    },
    HostedZoneId: aws_zone_id
  }).promise()

  return true

}

export default deleteRecords
