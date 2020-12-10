import { route53 } from '@core/vendor/aws'

const getType = (type, name, value) => {
  if(type === 'A') {
    return {
      Name: name,
      ResourceRecords: [
        { Value: value }
      ],
      TTL: 60,
      Type: 'A'
    }
  }
}

const createRecord = async (req, { aws_zone_id, type, name, value }) => {

  const result = await route53.changeResourceRecordSets({
    ChangeBatch: {
      Changes: [
        {
          Action: 'CREATE',
          ResourceRecordSet: getType(type, name, value)
        }
      ]
    },
    HostedZoneId: aws_zone_id
  }).promise()

  return {
  }

}

export default createRecord
