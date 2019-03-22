import Member from '../../../models/member'
import { Route } from 'maha'

const processor = async (req, trx, options) => {

  await options.knex('expenses_members').transacting(trx).where({
    user_id: req.params.user_id
  }).delete()

  return await Promise.map(req.body.assignments, async assignment => {

    const member = await Member.forge({
      ...assignment,
      team_id: req.team.get('id'),
      user_id: req.params.user_id,
      is_active: true
    }).save(null, { transacting: trx })

    return await member.load(['user.photo','project'], { transacting: trx })

  })

}

const refresh = (req, trx, result, options) => [
  `/admin/expenses/projects/${result.get('project_id')}`
]

const assignRoute = new Route({
  method: 'patch',
  path: '',
  processor,
  refresh
})

export default assignRoute
