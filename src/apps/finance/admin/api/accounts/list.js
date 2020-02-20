import AccountSerializer from '../../../serializers/account_serializer'
import Account from '../../../models/account'

const listRoute = async (req, res) => {

  const accounts = await Account.filterFetch({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: {
      params: req.query.$filter,
      allowed: ['name']
    },
    sort: {
      params: req.query.$sort,
      defaults: ['name'],
      allowed: ['id','name','created_at']
    },
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(accounts, AccountSerializer)

}

export default listRoute
