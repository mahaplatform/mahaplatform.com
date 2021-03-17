import SetupDomainQueue from '@apps/websites/queues/setup_domain_queue'
import { getOperationDetail, enableDomainTransferLock } from '@core/services/aws/domains'
import { listZones } from '@core/services/aws/route53'
import _ from 'lodash'

const checkOperation = async(req, { domain }) => {

  const result = await getOperationDetail({
    aws_operation_id: domain.get('aws_operation_id')
  })

  if(result.status === 'successful') {

    const zones = await listZones(req)

    const zone = zones.find(zone => {
      return zone.name === domain.get('name')
    })

    await enableDomainTransferLock({
      name: domain.name
    })

    await domain.save({
      aws_zone_id: zone.id,
      is_locked: true,
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

    await SetupDomainQueue.enqueue(req, {
      domain_id: domain.get('id'),
      action: 'setup_zone'
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
