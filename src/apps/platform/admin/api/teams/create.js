import TeamSerializer from '../../../serializers/team_serializer'
import { Role, Team, User, Route } from 'maha'
import { sendUserActivation } from 'team'

const processor = async (req, trx, options) => {

  const team = await Team.forge({
    title: req.body.title,
    subdomain: req.body.subdomain
  }).save(null, {
    transacting: trx
  })

  const user = await User.forge({
    team_id: team.get('id'),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }).save(null, {
    transacting: trx
  })

  const app_ids = [
    1,
    ...req.body.app_ids
  ]

  await options.knex('maha_teams_apps').transacting(trx).insert(app_ids.map(app_id => ({
    team_id: team.get('id'),
    app_id
  })))

  await options.knex('maha_installations').transacting(trx).insert({
    team_id: team.get('id'),
    app_id: 1
  })

  const role = await Role.forge({
    team_id: team.get('id'),
    title: 'Team Administrators',
    description: 'Users who have adminstrative access to the entire platform'
  }).save(null, {
    transacting: trx
  })

  await options.knex('maha_users_roles').transacting(trx).insert({
    user_id: user.get('id'),
    role_id: role.get('id')
  })

  await options.knex('maha_roles_apps').transacting(trx).insert(app_ids.map(app_id => ({
    role_id: role.get('id'),
    app_id
  })))

  const rights = await options.knex('maha_rights').transacting(trx).whereIn('id', app_ids)

  await options.knex('maha_roles_rights').transacting(trx).insert(rights.map(right => ({
    role_id: role.get('id'),
    right_id: right.id
  })))

  await sendUserActivation(req, trx, user)

  return team

}

const appsRoute = new Route({
  path: '',
  processor,
  method: 'post',
  rules: {
    title: 'required',
    subdomain: 'required',
    first_name: 'required',
    last_name: 'required',
    email: ['required','email']
  },
  serializer: TeamSerializer
})

export default appsRoute
