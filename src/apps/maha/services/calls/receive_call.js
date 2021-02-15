import Number from '@apps/maha/models/number'
import Call from '@apps/maha/models/call'
import moment from 'moment'

const receiveCall = async (req, params) => {

  const from_number = await Number.fetchOrCreate({
    number: params.from
  }, {
    transacting: req.trx
  })

  const to_number = await Number.fetchOrCreate({
    number: params.to
  }, {
    transacting: req.trx
  })

  return await Call.forge({
    team_id: req.team.get('id'),
    from_number_id: from_number.get('id'),
    to_number_id: to_number.get('id'),
    direction: params.direction || 'inbound',
    sid: params.sid,
    status: params.status,
    received_at: moment()
  }).save(null, {
    transacting: req.trx
  })

}

export default receiveCall
