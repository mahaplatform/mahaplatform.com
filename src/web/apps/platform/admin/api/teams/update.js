import { updateRelated } from '../../../../../core/services/routes/relations'
import { whitelist } from '../../../../../core/services/routes/params'
import TeamSerializer from '../../../serializers/team_serializer'
import socket from '../../../../../core/services/routes/emitter'
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

  await team.save(whitelist(req.body, ['title','subdomain']), {
    patch: true,
    transacting: req.trx
  })

  await updateRelated(req, {
    object: team,
    related: 'apps',
    table: 'maha_teams_apps',
    ids: req.body.app_ids,
    foreign_key: 'team_id',
    related_foreign_key: 'app_id'
  })

  await socket.refresh(req, [
    '/admin/platform/teams',
    `/admin/platform/teams/${team.get('id')}`
  ])

  res.status(200).respond(team, TeamSerializer)

}

export default updateRoute
