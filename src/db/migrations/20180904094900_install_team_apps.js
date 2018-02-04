import { Migration } from 'maha'

const InstallTeamApps = new Migration({

  up: async (knex) => {

    const teams = [
      { id: 1, app_ids: [1,2,3,5,6,7,8] },
      { id: 7, app_ids: [1,4] }
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
