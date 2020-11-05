import { createUser, sendActivation } from '@apps/team/services/users'
import socket from '@core/services/routes/emitter'
import Account from '@apps/maha/models/account'

const createRoute = async (req, res) => {

  const account = await Account.query(qb => {
    qb.where('id', req.params.account_id)
  }).fetch({
    transacting: req.trx
  })

  if(!account) return res.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  const user = await createUser(req, {
    team_id: req.body.team_id,
    first_name: account.get('first_name'),
    last_name: account.get('last_name'),
    email: account.get('email'),
    role_ids: req.body.role_ids
  })

  await sendActivation(req, {
    user
  })

  await socket.refresh(req, [
    `/admin/platform/accounts/${req.account.get('id')}`
  ])

  res.status(200).respond(true)

}

export default createRoute
