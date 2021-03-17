import { getContactReachabilityStatus } from '@core/services/aws/domains'
import SetupDomainQueue from '@apps/websites/queues/setup_domain_queue'

const checkRegistrant = async(req, { domain }) => {

  const result = await getContactReachabilityStatus(req, {
    name: domain.get('name')
  })

  if(result.status === 'done') {

    await domain.save({
      registrant_status: 'success'
    }, {
      transacting: req.trx,
      patch: true
    })

    SetupDomainQueue.enqueue(req, {
      domain_id: domain.get('id'),
      action: 'check_operation'
    })

  } else if(result.status === 'pending') {

    SetupDomainQueue.enqueue(req, {
      domain_id: domain.get('id'),
      action: 'check_registrant'
    }, {
      delay: 5 * 60 * 1000
    })

  }

}

export default checkRegistrant
