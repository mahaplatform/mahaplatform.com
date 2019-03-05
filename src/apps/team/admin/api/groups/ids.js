import { Route } from 'maha'

const processor = async (req, trx, options) => {

  const group_id = req.params.group_id

  const users = await options.knex('maha_users_groups').transacting(trx).where({ group_id })

  const user_ids = users.map(user => user.user_id)

  return { user_ids }

}

const idsRoute = new Route({
  path: '/ids',
  method: 'get',
  processor
})

export default idsRoute
