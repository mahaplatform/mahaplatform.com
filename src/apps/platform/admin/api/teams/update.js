import { whitelist } from '@core/services/routes/params'
import TeamSerializer from '../../../serializers/team_serializer'
import socket from '@core/services/routes/emitter'
import { updateApps } from '../../../services/apps'
import Team from '../../../../maha/models/team'

const updateRoute = async (req, res) => {

  const team = await Team.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx
  })

  if(!team) return res.status(404).respond({
    code: 404,
    message: 'Unable to load team'
  })

  await team.save(whitelist(req.body, ['title','subdomain','logo_id']), {
    patch: true,
    transacting: req.trx
  })

  await updateApps(req, {
    team,
    app_ids: req.body.app_ids
  })

  await socket.message(req, {
    channel: `/admin/teams/${team.get('id')}`,
    action: 'session'
  })

  await socket.refresh(req, [
    '/admin/platform/teams',
    `/admin/platform/teams/${team.get('id')}`,
    { channel: `/admin/teams/${team.get('id')}`, target: '/admin/team/settings' }
  ])

  res.status(200).respond(team, TeamSerializer)

}

export default updateRoute
