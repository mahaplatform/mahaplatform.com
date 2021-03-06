import InitiateCallQueue from '@apps/maha/queues/initiate_call_queue'
import { findOrCreateNumber } from '../numbers'
import Call from '@apps/maha/models/call'

const createCall = async (req, { from, to, method, url }) => {

  const from_number = await findOrCreateNumber(req, {
    number: from
  })

  const to_number = await findOrCreateNumber(req, {
    number: to
  })

  const call = await Call.forge({
    team_id: req.team.get('id'),
    from_number_id: from_number.get('id'),
    to_number_id: to_number.get('id'),
    direction: 'outbound'
  }).save(null, {
    transacting: req.trx
  })

  await InitiateCallQueue.enqueue(req, {
    call_id: call.get('id'),
    method,
    url
  })

  return call

}

export default createCall
