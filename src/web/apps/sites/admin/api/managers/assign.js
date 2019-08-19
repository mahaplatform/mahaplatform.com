import ManagerSerializer from '../../../serializers/manager_serializer'
import Manager from '../../../models/manager'

const assignRoute = async (req, res) => {

  await req.trx('sites_managers')
    .where('site_id', req.params.site_id)
    .delete()

  const managers = await Promise.map(req.body.assignments, async assignment => {

    const manager = await Manager.forge({
      team_id: req.team.get('id'),
      site_id: req.params.site_id,
      ...assignment
    }).save(null, {
      transacting: req.trx
    })

    return await manager.load(['user.photo'], {
      transacting: req.trx
    })

  })

  res.status(200).respond(managers, ManagerSerializer)

}

export default assignRoute
