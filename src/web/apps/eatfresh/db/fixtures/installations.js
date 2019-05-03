import Fixtures from '../../../../core/objects/fixtures'

const installationsFixtures = new Fixtures({

  tableName: 'maha_installations',

  records: {

    acme_eatfresh_installation: (data) => ({
      team_id: data.maha_teams.acme.id,
      app_id: data.maha_apps.eatfresh.id,
      settings: {}
    }),

    soylent_eatfresh_installation: (data) => ({
      team_id: data.maha_teams.soylent.id,
      app_id: data.maha_apps.eatfresh.id,
      settings: {}
    })

  }

})

export default installationsFixtures
