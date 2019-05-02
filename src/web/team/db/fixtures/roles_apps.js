import { Fixtures } from 'maha'

const rolesAppsFixtures = new Fixtures({

  tableName: 'maha_roles_apps',

  records: {

    acme_platform_administrator_team: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      app_id: data.maha_apps.team.id
    }),

    soylent_platform_administrator_team: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      app_id: data.maha_apps.team.id
    }),

    wonka_platform_administrator_team: (data) => ({
      role_id: data.maha_roles.wonka_platform_administrator.id,
      app_id: data.maha_apps.team.id
    })

  }

})

export default rolesAppsFixtures
