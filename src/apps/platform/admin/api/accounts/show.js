import AccountSerializer from '../../../serializers/account_serializer'
import Account from '../../../../maha/models/account'

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

  res.status(200).respond(account, AccountSerializer)

}

export default showRoute
