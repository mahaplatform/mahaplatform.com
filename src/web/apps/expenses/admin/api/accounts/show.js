import AccountSerializer from '../../../serializers/account_serializer'
import Account from '../../../models/account'

const showRoute = async (req, res) => {

  const account = await Account.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!account) return req.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  res.status(200).respond(account, (account) => {
    return AccountSerializer(req, account)
  })

}

export default showRoute
