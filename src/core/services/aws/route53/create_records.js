import { route53 } from '@core/vendor/aws'
import { getRecordType } from './utils'

const createRecords = async (req, { aws_zone_id, records }) => {

  const result = await route53.changeResourceRecordSets({
    ChangeBatch: {
      Changes: records.map(record => ({
        Action: 'CREATE',
        ResourceRecordSet: getRecordType(record)
      }))
    },
    HostedZoneId: aws_zone_id
  }).promise()

  return {
  }

}

export default createRecords
