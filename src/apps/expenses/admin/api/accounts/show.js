import AccountSerializer from '../../../serializers/account_serializer'
import Account from '../../../models/account'

const showRoute = async (req, res) => {

  const account = await Account.scope(qb => {
    qb.where('team_id', req.team.get('id'))
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!account) return res.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  res.status(200).respond(account, AccountSerializer)

}

export default showRoute
