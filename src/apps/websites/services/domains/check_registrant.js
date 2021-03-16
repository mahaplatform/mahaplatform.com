import { getContactReachabilityStatus } from '@core/services/aws/domains'
import CheckRegistrantQueue from '@apps/websites/queues/check_registrant_queue'
import CheckOperationQueue from '@apps/websites/queues/check_operation_queue'

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

    CheckOperationQueue.enqueue(req, {
      domain_id: domain.get('id')
    })

  } else if(result.status === 'pending') {

    CheckRegistrantQueue.enqueue(req, {
      domain_id: domain.get('id')
    }, {
      delay: 5 * 60 * 1000
    })

  }

}

export default checkRegistrant
