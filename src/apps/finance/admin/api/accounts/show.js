import AccountSerializer from '@apps/finance/serializers/account_serializer'
import Account from '@apps/finance/models/account'

const showRoute = async (req, res) => {

  const account = await Account.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!account) return res.status(404).respond({
    code: 404,
    message: 'Unable to load account'
  })

  await res.status(200).respond(account, AccountSerializer)

}

export default showRoute
