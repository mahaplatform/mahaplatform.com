import SetupZoneQueue from '@apps/websites/queues/setup_zone_queue'
import { getOperationDetail } from '@core/services/aws/domains'
import { listZones } from '@core/services/aws/route53'
import _ from 'lodash'

const checkOperation = async(req, { domain }) => {

  const result = await getOperationDetail(req, {
    aws_operation_id: domain.get('aws_operation_id')
  })

  if(result.status === 'successful') {

    const zones = await listZones(req)

    const zone = zones.find(zone => {
      return zone.name === domain.get('name')
    })

    await domain.save({
      aws_zone_id: zone.id,
      ...domain.type === 'registration' ? {
        registration_status: 'success'
      } : {},
      ...domain.type === 'transfer' ? {
        transfer_status: 'success'
      } : {}
    }, {
      transacting: req.trx,
      patch: true
    })

    await SetupZoneQueue.enqueue(req, {
      domain_id: domain.get('id')
    })

  }

  if(_.includes(['failed','error'], result.status)) {
    await domain.save({
      ...domain.type === 'registration' ? {
        registration_status: 'failed'
      } : {},
      ...domain.type === 'transfer' ? {
        transfer_status: 'failed'
      } : {},
      status: 'failed'
    }, {
      transacting: req.trx,
      patch: true
    })
  }

}

export default checkOperation
