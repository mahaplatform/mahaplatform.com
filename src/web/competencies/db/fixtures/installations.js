import { Fixtures } from 'maha'

const installationsFixtures = new Fixtures({

  tableName: 'maha_installations',

  records: {

    acme_competencies_installation: (data) => ({
      team_id: data.maha_teams.acme.id,
      app_id: data.maha_apps.competencies.id,
      settings: {}
    }),

    soylent_competencies_installation: (data) => ({
      team_id: data.maha_teams.soylent.id,
      app_id: data.maha_apps.competencies.id,
      settings: {}
    })

  }

})

export default installationsFixtures
