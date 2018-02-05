import { Migration, Team, User } from 'maha'
import moment from 'moment'

const InstallTeamApps = new Migration({

  up: async (knex) => {

    const maha = await Team.forge({
      title: 'MAHA Platform',
      subdomain: 'maha',
      color: 'red'
    }).save(null)

    const team_id = maha.get('id')

    const user = await User.forge({
      team_id,
      first_name: 'Greg',
      last_name: 'Kops',
      email: 'greg@thinktopography.com',
      password: 'mahaplatform',
      is_active: true,
      activated_at: moment(),
      values: {}
    }).save(null)

    const user_id = user.get('id')

    await knex('maha_strategies').insert({
      team_id,
      name: 'local',
      created_at: moment(),
      updated_at: moment()
    })

    await knex('maha_installations').insert([{
      team_id,
      app_id: 1,
      settings: {},
      created_at: moment(),
      updated_at: moment()
    }, {
      team_id,
      app_id: 9,
      settings: {},
      created_at: moment(),
      updated_at: moment()
    }])

    const role = await knex('maha_roles').insert({
      team_id: 1,
      title: 'Team Administrators',
      description: 'Team Administrators',
      created_at: moment(),
      updated_at: moment()
    }).returning('id')

    await knex('maha_roles_apps').insert([{
      role_id: role[0],
      app_id: 1
    }, {
      role_id: role[0],
      app_id: 9
    }])

    await knex('maha_roles_rights').insert([{
      role_id: role[0],
      right_id: 1
    }, {
      role_id: role[0],
      right_id: 2
    }, {
      role_id: role[0],
      right_id: 3
    }])

    await knex('maha_users_roles').insert({
      role_id: role[0],
      user_id
    })

    const teams = [
      { id: 1, app_ids: [1,2,3,5,6,7,8] },
      { id: 7, app_ids: [1,4] },
      { id: team_id, app_ids: [1,9] }
    ]

    await knex('maha_teams_apps').insert(teams.reduce((apps, team) => [
      ...apps,
      ...team.app_ids.map(app_id => ({
        team_id: team.id,
        app_id
      }))
    ], []))
  },

  down: async (knex) => {}

})

export default InstallTeamApps
