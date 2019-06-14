import { sendUserActivation } from '../../../../team/services/users'
import TeamSerializer from '../../../serializers/team_serializer'
import knex from '../../../../../core/services/knex'
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

  await knex('maha_teams_apps').transacting(req.trx).insert(app_ids.map(app_id => ({
    team_id: team.get('id'),
    app_id
  })))

  await knex('maha_installations').transacting(req.trx).insert({
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

  await knex('maha_users_roles').transacting(req.trx).insert({
    user_id: user.get('id'),
    role_id: role.get('id')
  })

  await knex('maha_roles_apps').transacting(req.trx).insert(app_ids.map(app_id => ({
    role_id: role.get('id'),
    app_id
  })))

  const rights = await knex('maha_rights').transacting(req.trx).whereIn('id', app_ids)

  await knex('maha_roles_rights').transacting(req.trx).insert(rights.map(right => ({
    role_id: role.get('id'),
    right_id: right.id
  })))

  await sendUserActivation(req, user)

  res.status(200).respond(team, (team) => {
    return TeamSerializer(req, team)
  })

}

export default createRoute
