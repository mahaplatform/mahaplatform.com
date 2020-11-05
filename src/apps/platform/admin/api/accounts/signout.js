import socket from '@core/services/routes/emitter'
import Account from '../../../../maha/models/account'
import moment from 'moment'

const signoutRoute = async (req, res) => {

  const account = await Account.query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!account) return res.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  await account.save({
    invalidated_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.message(req, {
    channel: `/admin/accounts/${account.get('id')}`,
    action: 'signout'
  })

  res.status(200).respond(true)

}

export default signoutRoute
