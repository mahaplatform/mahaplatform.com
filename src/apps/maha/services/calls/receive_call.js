import { findOrCreateNumber } from '../numbers'
import Call from '../../models/call'
import moment from 'moment'

const receiveCall = async (req, params) => {

  const from = await findOrCreateNumber(req, {
    number: params.from
  })

  const to = await findOrCreateNumber(req, {
    number: params.to
  })

  const { sid, status, direction } = params

  const call = await Call.forge({
    team_id: req.team.get('id'),
    from_id: from.get('id'),
    to_id: to.get('id'),
    direction: direction || 'inbound',
    sid,
    status,
    received_at: moment()
  }).save(null, {
    transacting: req.trx
  })

  return call

}

export default receiveCall
