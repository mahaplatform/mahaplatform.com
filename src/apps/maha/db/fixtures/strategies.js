import Fixtures from '../../core/objects/fixtures'

const strategiesFixtures = new Fixtures({

  tableName: 'maha_strategies',

  records: {

    acme_local: (data) => ({
      team_id: data.maha_teams.acme.id,
      name: 'local'
    }),

    acme_google: (data) => ({
      team_id: data.maha_teams.acme.id,
      name: 'google'
    }),

    soylent_local: (data) => ({
      team_id: data.maha_teams.soylent.id,
      name: 'local'
    }),

    wonka_local: (data) => ({
      team_id: data.maha_teams.wonka.id,
      name: 'local'
    })

  }

})

export default strategiesFixtures
