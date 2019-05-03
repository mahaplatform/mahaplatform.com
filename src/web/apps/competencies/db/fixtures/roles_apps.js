import Fixtures from '../../../../core/objects/fixtures'

const rolesAppsFixtures = new Fixtures({

  tableName: 'maha_roles_apps',

  records: {

    acme_platform_administrator_competencies: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      app_id: data.maha_apps.competencies.id
    }),

    soylent_platform_administrator_competencies: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      app_id: data.maha_apps.competencies.id
    })

  }

})

export default rolesAppsFixtures
