import AccountSerializer from '../../../serializers/account_serializer'
import Account from '../../../../maha/models/account'

const listRoute = async (req, res) => {

  const accounts = await Account.filterFetch({
    scope: (qb) => {},
    filter: {
      params: req.query.$filter,
      search: ['first_name','last_name','email']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'last_name',
      allowed: ['last_name']
    },
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(accounts, AccountSerializer)
}

export default listRoute
