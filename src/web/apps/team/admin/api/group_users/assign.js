import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  await options.knex('maha_users_groups').transacting(trx).where({
    group_id: req.params.group_id
  }).delete()

  await Promise.map(req.body.assignments, async assignment => {

    await options.knex('maha_users_groups').transacting(trx).insert({
      ...assignment,
      group_id: req.params.group_id
    })

  })

  return true

}

const refresh = (req, trx, result, options) => [
  `/admin/team/groups/${req.params.group_id}`
]

const assignRoute = new Route({
  method: 'patch',
  path: '',
  processor,
  refresh
})

export default assignRoute
