import socket from '@core/services/routes/emitter'
import Account from '@apps/maha/models/account'

const unblockRoute = async (req, res) => {

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
    is_blocked: false
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/platform/accounts',
    `/admin/platform/accounts/${account.get('id')}`
  ])

  res.status(200).respond(true)

}

export default unblockRoute
