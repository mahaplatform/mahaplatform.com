import { Fixtures } from 'maha'

const rolesAppsFixtures = new Fixtures({

  tableName: 'maha_roles_apps',

  records: {

    acme_platform_administrator_expenses: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      app_id: data.maha_apps.expenses.id
    }),

    soylent_platform_administrator_expenses: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      app_id: data.maha_apps.expenses.id
    })

  }

})

export default rolesAppsFixtures
