import { route53 } from '@core/vendor/aws'

const deleteRecords = async (req, { aws_zone_id, records }) => {

  const result = await route53.changeResourceRecordSets({
    ChangeBatch: {
      Changes: records.map(record => ({
        Action: 'DELETE',
        ResourceRecordSet: {
          Name: record.name,
          Type: record.type,
          TTL: 60,
          ResourceRecords: [
            { Value: record.value }
          ]
        }
      }))
    },
    HostedZoneId: aws_zone_id
  }).promise()

  return {
  }

}

export default deleteRecords
