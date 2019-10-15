import AccountSerializer from '../../../serializers/account_serializer'
import { activity } from '../../../../../core/services/routes/activities'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Account from '../../../models/account'

const updateRoute = async (req, res) => {

  const account = await Account.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    patch: true,
    transacting: req.trx
  })

  if(!account) return res.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  await account.save(whitelist(req.body, ['name', 'integration']), {
    transacting: req.trx
  })

  await activity(req, {
    story: 'updated {object}',
    object: account
  })

  await socket.refresh(req, [
    '/admin/expenses/accounts',
    `/admin/expenses/accounts/${req.params.id}`
  ])

  res.status(200).respond(account, AccountSerializer)

}

export default updateRoute
