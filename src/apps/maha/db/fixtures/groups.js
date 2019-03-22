import Fixtures from '../../core/objects/fixtures'

const groupsFixtures = new Fixtures({

  tableName: 'maha_groups',

  records: {

    acme_administrators: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Administrators'
    }),

    acme_hr: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Human Resources'
    }),

    acme_finance: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Finance'
    }),

    acme_sales: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Sales'
    }),

    acme_marketing: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Marketing'
    }),

    acme_it: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Information Technology'
    }),

    acme_production: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Production'
    }),

    soylent_administrators: (data) => ({
      team_id: data.maha_teams.soylent.id,
      title: 'Administrators'
    }),

    soylent_hr: (data) => ({
      team_id: data.maha_teams.soylent.id,
      title: 'Human Resources'
    }),

    soylent_finance: (data) => ({
      team_id: data.maha_teams.soylent.id,
      title: 'Finance'
    }),

    soylent_sales: (data) => ({
      team_id: data.maha_teams.soylent.id,
      title: 'Sales'
    }),

    soylent_marketing: (data) => ({
      team_id: data.maha_teams.soylent.id,
      title: 'Marketing'
    }),

    soylent_it: (data) => ({
      team_id: data.maha_teams.soylent.id,
      title: 'Information Technology'
    }),

    soylent_production: (data) => ({
      team_id: data.maha_teams.soylent.id,
      title: 'Production'
    })

  }

})

export default groupsFixtures
