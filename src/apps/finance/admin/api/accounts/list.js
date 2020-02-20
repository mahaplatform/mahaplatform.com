import AccountSerializer from '../../../serializers/account_serializer'
import Account from '../../../models/account'

const listRoute = async (req, res) => {

  const accounts = await Account.filter({
    scope: (qb) => {
      qb.where('team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    searchParams: ['name'],
    sort: req.query.$sort,
    defaultSort: ['name'],
    sortParams: ['id','name','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(accounts, AccountSerializer)

}

export default listRoute
