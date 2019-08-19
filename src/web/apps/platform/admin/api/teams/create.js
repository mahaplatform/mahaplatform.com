import { sendUserActivation } from '../../../../team/services/users'
import TeamSerializer from '../../../serializers/team_serializer'
import Role from '../../../../maha/models/role'
import Team from '../../../../maha/models/team'
import User from '../../../../maha/models/user'

const createRoute = async (req, res) => {

  const team = await Team.forge({
    title: req.body.title,
    subdomain: req.body.subdomain
  }).save(null, {
    transacting: req.trx
  })

  const user = await User.forge({
    team_id: team.get('id'),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }).save(null, {
    transacting: req.trx
  })

  const app_ids = [
    1,
    ...req.body.app_ids
  ]

  await req.trx('maha_teams_apps').insert(app_ids.map(app_id => ({
    team_id: team.get('id'),
    app_id
  })))

  await req.trx('maha_installations').insert({
    team_id: team.get('id'),
    app_id: 1
  })

  const role = await Role.forge({
    team_id: team.get('id'),
    title: 'Team Administrators',
    description: 'Users who have adminstrative access to the entire platform'
  }).save(null, {
    transacting: req.trx
  })

  await req.trx('maha_users_roles').insert({
    user_id: user.get('id'),
    role_id: role.get('id')
  })

  await req.trx('maha_roles_apps').insert(app_ids.map(app_id => ({
    role_id: role.get('id'),
    app_id
  })))

  const rights = await req.trx('maha_rights').whereIn('id', app_ids)

  await req.trx('maha_roles_rights').insert(rights.map(right => ({
    role_id: role.get('id'),
    right_id: right.id
  })))

  await sendUserActivation(req, user)

  res.status(200).respond(team, TeamSerializer)

}

export default createRoute
