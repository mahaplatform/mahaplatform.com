import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const role_id = req.params.role_id

  const users = await options.knex('maha_users_roles').transacting(trx).where({ role_id })

  const user_ids = users.map(user => user.user_id)

  return { user_ids }

}

const idsRoute = new Route({
  path: '/ids',
  method: 'get',
  processor
})

export default idsRoute
