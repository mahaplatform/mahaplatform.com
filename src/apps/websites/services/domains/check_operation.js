import { getOperationDetail, enableDomainTransferLock, updateDomainContactPrivacy} from '@core/services/aws/domains'
import { listZones } from '@core/services/aws/route53'
import moment from 'moment'
import _ from 'lodash'

const checkOperation = async(req, { domain, queue = true }) => {

  const result = await getOperationDetail({
    aws_operation_id: domain.get('aws_operation_id')
  })

  if(result.status === 'successful') {

    const zones = await listZones(req)

    const zone = zones.find(zone => {
      return zone.name.replace(/\.$/,'') === domain.get('name')
    })

    await enableDomainTransferLock({
      name: domain.get('name')
    })

    await updateDomainContactPrivacy({
      name: domain.get('name')
    })

    await domain.save({
      expires_on: moment().add(1,'year'),
      aws_zone_id: zone.id,
      is_locked: true,
      auto_renew: true,
      ...domain.get('type') === 'registration' ? {
        registration_status: 'success'
      } : {},
      ...domain.get('type') === 'transfer' ? {
        transfer_status: 'success'
      } : {},
      dns_status: 'success',
      status: 'active'
    }, {
      transacting: req.trx,
      patch: true
    })

  }

  if(_.includes(['failed','error'], result.status)) {
    await domain.save({
      ...domain.get('type') === 'registration' ? {
        registration_status: 'failed'
      } : {},
      ...domain.get('type') === 'transfer' ? {
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
