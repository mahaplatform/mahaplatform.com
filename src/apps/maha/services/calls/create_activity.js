import CallActivity from '@apps/maha/models/call_activity'
import Call from '@apps/maha/models/call'

const createCallActivity = async (req, params) => {

  const call = await Call.query(qb => {
    qb.where('sid', params.sid)
  }).fetch({
    transacting: req.trx
  })

  await CallActivity.forge({
    team_id: call.get('team_id'),
    user_id: req.user ? req.user.get('id') : null,
    call_id: call.get('id'),
    type: params.type,
    to_user_id: params.to_user_id,
    client: params.client
  }).save(null, {
    transacting: req.trx
  })

}

export default createCallActivity
