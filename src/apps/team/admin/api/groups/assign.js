import { Route } from 'maha'

const processor = async (req, trx, options) => {

  const group_id = req.params.group_id

  await options.knex('maha_users_groups').transacting(trx).where({ group_id }).del()

  await Promise.map(req.body.user_ids, async (user_id) => {
    await options.knex('maha_users_groups').transacting(trx).insert({ group_id, user_id })
  })

  return true

}

const refresh = (req, trx, result, options) => [
  `/admin/team/groups/${req.params.group_id}`
]

const rules = {
  user_ids: 'required'
}

const assignRoute = new Route({
  path: '',
  method: 'patch',
  processor,
  refresh,
  rules
})

export default assignRoute
