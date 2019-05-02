import { Fixtures } from 'maha'

const RolesRightsFixtures = new Fixtures({

  tableName: 'maha_roles_rights',

  records: {

    acme_platform_administrator_team_manage_team: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      right_id: data.maha_rights.team_manage_team.id
    }),

    acme_platform_administrator_team_manage_apps: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      right_id: data.maha_rights.team_manage_apps.id
    }),

    acme_platform_administrator_team_manage_people: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      right_id: data.maha_rights.team_manage_people.id
    }),

    soylent_platform_administrator_team_manage_team: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      right_id: data.maha_rights.team_manage_team.id
    }),

    soylent_platform_administrator_team_manage_apps: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      right_id: data.maha_rights.team_manage_apps.id
    }),

    soylent_platform_administrator_team_manage_people: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      right_id: data.maha_rights.team_manage_people.id
    }),

    wonka_platform_administrator_team_manage_team: (data) => ({
      role_id: data.maha_roles.wonka_platform_administrator.id,
      right_id: data.maha_rights.team_manage_team.id
    }),

    wonka_platform_administrator_team_manage_apps: (data) => ({
      role_id: data.maha_roles.wonka_platform_administrator.id,
      right_id: data.maha_rights.team_manage_apps.id
    }),

    wonka_platform_administrator_team_manage_people: (data) => ({
      role_id: data.maha_roles.wonka_platform_administrator.id,
      right_id: data.maha_rights.team_manage_people.id
    })

  }

})

export default RolesRightsFixtures
