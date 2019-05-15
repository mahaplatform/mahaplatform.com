import { activity } from '../../../../../core/services/routes/activities'
import AccountSerializer from '../../../serializers/account_serializer'
import socket from '../../../../../core/services/routes/emitter'
import Account from '../../../models/account'
import _ from 'lodash'

const createRoute = async (req, res) => {

  const allowed = _.pick(req.body, ['name', 'integration'])

  const data = _.omitBy(allowed, _.isNil)

  const account = await Account.forge({
    team_id: req.team.get('id'),
    ...data
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
    return AccountSerializer(req, req.trx, account)
  })

}

export default createRoute
