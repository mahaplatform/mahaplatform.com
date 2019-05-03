import Fixtures from '../../../../core/objects/fixtures'

const rolesFixtures = new Fixtures({

  tableName: 'maha_roles',

  records: {

    acme_platform_administrator: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Platform Administrator',
      description: 'Users who have adminstrative access to the entire platform'
    }),

    acme_employees: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Employees',
      description: 'Users with basic rights to the system'
    }),

    soylent_platform_administrator: (data) => ({
      team_id: data.maha_teams.soylent.id,
      title: 'Platform Administrator',
      description: 'Users who have adminstrative access to the entire platform'
    }),

    soylent_employees: (data) => ({
      team_id: data.maha_teams.soylent.id,
      title: 'Employees',
      description: 'Users with basic rights to the system'
    }),

    wonka_platform_administrator: (data) => ({
      team_id: data.maha_teams.wonka.id,
      title: 'Platform Administrator',
      description: 'Users who have adminstrative access to the entire platform'
    })

  }

})

export default rolesFixtures
