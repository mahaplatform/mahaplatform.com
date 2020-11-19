import AccountSerializer from '@apps/platform/serializers/account_serializer'
import { getAccounts } from '@apps/maha/services/accounts'

const listRoute = async (req, res) => {

  const accounts = await getAccounts(req, {
    filter: req.query.$filter,
    page: req.query.$page
  })

  res.status(200).respond(accounts, AccountSerializer)
}

export default listRoute
