import { route53 } from '@core/vendor/aws'

const deleteRecord = async (req, { aws_zone_id, name }) => {

  const result = await route53.changeResourceRecordSets({
    ChangeBatch: {
      Changes: [
        {
          Action: 'DELETE',
          ResourceRecordSet: {
            Name: name
          }
        }
      ]
    },
    HostedZoneId: aws_zone_id
  }).promise()

  return {
  }

}

export default deleteRecord
