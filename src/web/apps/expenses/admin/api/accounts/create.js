import { activity } from '../../../../../core/services/routes/activities'
import AccountSerializer from '../../../serializers/account_serializer'
import { whitelist } from '../../../../../core/services/routes/params'
import socket from '../../../../../core/services/routes/emitter'
import Account from '../../../models/account'

const createRoute = async (req, res) => {

  const account = await Account.forge({
    team_id: req.team.get('id'),
    ...whitelist(req.body, ['name', 'integration'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: account
  })

  await socket.refresh(req, [
    '/admin/expenses/accounts'
  ])

  res.status(200).respond(account, (account) => {
    return AccountSerializer(req, account)
  })

}

export default createRoute
