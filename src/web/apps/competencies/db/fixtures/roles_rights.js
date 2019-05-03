import Fixtures from '../../../../core/objects/fixtures'

const rolesRightsFixtures = new Fixtures({

  tableName: 'maha_roles_rights',

  records: {

    acme_platform_administrator_competencies_manage_configuration: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      right_id: data.maha_rights.competencies_manage_configuration.id
    }),

    acme_platform_administrator_competencies_manage_plans: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      right_id: data.maha_rights.competencies_manage_plans.id
    }),

    soylent_platform_administrator_competencies_manage_plans: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      right_id: data.maha_rights.competencies_manage_plans.id
    }),

    soylent_platform_administrator_team_manage_people: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      right_id: data.maha_rights.team_manage_people.id
    })

  }

})

export default rolesRightsFixtures
