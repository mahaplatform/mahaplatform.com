import Fixtures from '../../../../core/objects/fixtures'

const InstallationsFixtures = new Fixtures({

  tableName: 'maha_installations',

  records: {

    acme_team_installation: (data) => ({
      team_id: data.maha_teams.acme.id,
      app_id: data.maha_apps.team.id,
      settings: {}
    }),

    soylent_team_installation: (data) => ({
      team_id: data.maha_teams.soylent.id,
      app_id: data.maha_apps.team.id,
      settings: {}
    }),

    wonka_team_installation: (data) => ({
      team_id: data.maha_teams.wonka.id,
      app_id: data.maha_apps.team.id,
      settings: {}
    })

  }

})

export default InstallationsFixtures
