import { Fixtures } from 'maha'

const rolesRightsFixtures = new Fixtures({

  tableName: 'maha_roles_rights',

  records: {

    acme_platform_administrator_expenses_manage_configuration: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      right_id: data.maha_rights.expenses_manage_configuration.id
    }),

    acme_platform_administrator_expenses_manage_expenses: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      right_id: data.maha_rights.expenses_manage_expenses.id
    }),

    acme_platform_administrator_expenses_approve_expenses: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      right_id: data.maha_rights.expenses_approve_expenses.id
    }),

    acme_platform_administrator_expenses_access_reports: (data) => ({
      role_id: data.maha_roles.acme_platform_administrator.id,
      right_id: data.maha_rights.expenses_access_reports.id
    }),

    soylent_platform_administrator_expenses_manage_configuration: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      right_id: data.maha_rights.expenses_manage_configuration.id
    }),

    soylent_platform_administrator_expenses_manage_expenses: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      right_id: data.maha_rights.expenses_manage_expenses.id
    }),

    soylent_platform_administrator_expenses_approve_expenses: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      right_id: data.maha_rights.expenses_approve_expenses.id
    }),

    soylent_platform_administrator_expenses_access_reports: (data) => ({
      role_id: data.maha_roles.soylent_platform_administrator.id,
      right_id: data.maha_rights.expenses_access_reports.id
    })

  }

})

export default rolesRightsFixtures
