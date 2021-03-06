import AccountSerializer from '@apps/platform/serializers/account_serializer'
import Account from '@apps/maha/models/account'

const showRoute = async (req, res) => {

  const account = await Account.query(qb => {
    qb.where('maha_accounts.id', req.params.id)
  }).fetch({
    withRelated: ['photo'],
    transacting: req.trx
  })

  if(!account) return res.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  await res.status(200).respond(account, AccountSerializer)

}

export default showRoute
