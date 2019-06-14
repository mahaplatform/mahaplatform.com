import AccountSerializer from '../../../serializers/account_serializer'
import Account from '../../../models/account'

const listRoute = async (req, res) => {

  const accounts = await Account.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    searchParams: ['name']
  }).sort({
    sort: req.query.$sort,
    defaultSort: ['name'],
    sortParams: ['id','name','created_at']
  }).fetchPage({
    page: req.query.$page,
    transacting: req.trx
  })

  res.status(200).respond(accounts, (account) => {
    return AccountSerializer(req, account)
  })

}

export default listRoute
