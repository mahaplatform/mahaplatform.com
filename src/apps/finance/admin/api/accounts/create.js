import { activity } from '@core/services/routes/activities'
import AccountSerializer from '@apps/finance/serializers/account_serializer'
import { whitelist } from '@core/services/routes/params'
import generateCode from '@core/utils/generate_code'
import Account from '@apps/finance/models/account'
import socket from '@core/services/routes/emitter'

const createRoute = async (req, res) => {

  const code = await generateCode(req, {
    table: 'maha_accounts'
  })

  const account = await Account.forge({
    team_id: req.team.get('id'),
    integration: {},
    code,
    ...whitelist(req.body, ['name', 'integration'])
  }).save(null, {
    transacting: req.trx
  })

  await activity(req, {
    story: 'created {object}',
    object: account
  })

  await socket.refresh(req, [
    '/admin/finance/accounts'
  ])

  await res.status(200).respond(account, AccountSerializer)

}

export default createRoute
