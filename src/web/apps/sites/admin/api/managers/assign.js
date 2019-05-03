import { Route } from '../../../../../core/backframe'
import Manager from '../../../models/manager'

const processor = async (req, trx, options) => {

  await options.knex('sites_managers').transacting(trx).where({
    site_id: req.params.site_id
  }).delete()

  return await Promise.map(req.body.assignments, async assignment => {

    const manager = await Manager.forge({
      ...assignment,
      team_id: req.team.get('id'),
      site_id: req.params.site_id
    }).save(null, { transacting: trx })

    return await manager.load(['user.photo'], { transacting: trx })

  })

}

const refresh = (req, trx, result, options) => [
  `/admin/sites/sites/${req.params.site_id}`
]

const assignRoute = new Route({
  method: 'patch',
  path: '',
  processor,
  refresh
})

export default assignRoute
