import { Route } from '../../../../../core/backframe'

const messages = (req, trx, result, options) => req.assignments.map(assignment => ({
  channel: `/admin/users/${assignment.user_id}`,
  action: 'session',
  data: null
}))

const processor = async (req, trx, options) => {

  await options.knex('maha_users_roles').transacting(trx).where({
    role_id: req.params.role_id
  }).delete()

  await Promise.map(req.body.assignments, async assignment => {

    await options.knex('maha_users_roles').transacting(trx).insert({
      ...assignment,
      role_id: req.params.role_id
    })

  })

  return true

}

const refresh = (req, trx, result, options) => [
  `/admin/team/roles/${req.params.role_id}`
]

const assignRoute = new Route({
  messages,
  method: 'patch',
  path: '',
  processor,
  refresh
})

export default assignRoute
