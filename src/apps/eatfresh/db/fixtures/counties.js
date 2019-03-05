import { Fixtures } from 'maha'

const countyFixtures = new Fixtures({

  tableName: 'eatfresh_counties',

  records: {

    erie_county: (data) => ({
      team_id: data.maha_teams.acme.id,
      name: 'Erie County'
    }),

    orleans_county: (data) => ({
      team_id: data.maha_teams.acme.id,
      name: 'Orleans County'
    }),

    niagara_county: (data) => ({
      team_id: data.maha_teams.acme.id,
      name: 'Niagara County'
    }),

    genesee_county: (data) => ({
      team_id: data.maha_teams.acme.id,
      name: 'Genesee County'
    })

  }

})

export default countyFixtures
