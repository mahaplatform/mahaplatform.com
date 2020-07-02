import { createUser, sendActivation } from '../../../../team/services/users'
import { whitelist } from '../../../../../core/services/routes/params'
import TeamSerializer from '../../../serializers/team_serializer'
import socket from '../../../../../core/services/routes/emitter'
import { updateApps } from '../../../services/apps'
import Role from '../../../../maha/models/role'
import Team from '../../../../maha/models/team'

const createRoute = async (req, res) => {

  const team = await Team.forge({
    ...whitelist(req.body, ['title','subdomain','authentication_strategy','logo_id'])
  }).save(null, {
    transacting: req.trx
  })

  const app_ids = [
    1,
    ...req.body.app_ids
  ]

  await updateApps(req, {
    team,
    app_ids: req.body.app_ids
  })

  const role = await Role.forge({
    team_id: team.get('id'),
    title: 'Team Administrators',
    description: 'Users who have adminstrative access to the entire platform'
  }).save(null, {
    transacting: req.trx
  })

  await req.trx('maha_roles_apps').insert(app_ids.map(app_id => ({
    role_id: role.get('id'),
    app_id
  })))

  const rights = await req.trx('maha_rights').whereIn('app_id', app_ids)

  await req.trx('maha_roles_rights').insert(rights.map(right => ({
    role_id: role.get('id'),
    right_id: right.id
  })))

  const user = await createUser(req, {
    team_id: team.get('id'),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    role_ids: [role.get('id')]
  })

  await sendActivation(req, {
    user
  })

  await socket.refresh(req, [
    '/admin/platform/teams'
  ])

  res.status(200).respond(team, TeamSerializer)

}

export default createRoute
