import AccountSerializer from '../../../serializers/account_serializer'
import Account from '../../../models/account'
import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import _ from 'lodash'

const updateRoute = async (req, res) => {

  const account = await Account.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    patch: true,
    transacting: req.trx
  })

  if(!account) return req.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  const allowed = _.pick(req.body, ['name', 'integration'])

  const data = _.omitBy(allowed, _.isNil)

  await account.save(data, {
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

  res.status(200).respond(account, (account) => {
    return AccountSerializer(req, req.trx, account)
  })

}

export default updateRoute
