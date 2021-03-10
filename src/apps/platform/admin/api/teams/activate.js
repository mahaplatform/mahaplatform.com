import TeamSerializer from '@apps/platform/serializers/team_serializer'
import socket from '@core/services/routes/emitter'
import Team from '@apps/maha/models/team'

const activateRoute = async (req, res) => {

  const team = await Team.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx
  })

  if(!team) return res.status(404).respond({
    code: 404,
    message: 'Unable to load team'
  })

  await team.save({
    is_active: req.body.is_active
  }, {
    patch: true,
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/platform/teams',
    `/admin/platform/teams/${team.get('id')}`,
    { channel: `/admin/teams/${team.get('id')}`, target: '/admin/team/settings' }
  ])

  await res.status(200).respond(team, TeamSerializer)

}

export default activateRoute
