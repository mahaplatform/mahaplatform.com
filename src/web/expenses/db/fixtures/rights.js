import { Fixtures } from 'maha'

const rightsFixtures = new Fixtures({

  tableName: 'maha_rights',

  records: {

    expenses_manage_configuration: (data) => ({
      app_id: data.maha_apps.expenses.id,
      text: 'MANAGE CONFIGURATION',
      description: 'manage projects and expense types'
    }),

    expenses_manage_expenses: (data) => ({
      app_id: data.maha_apps.expenses.id,
      text: 'MANAGE EXPENSES',
      description: 'install and manage apps and settings'
    }),

    expenses_approve_expenses: (data) => ({
      app_id: data.maha_apps.expenses.id,
      text: 'APPROVE EXPENSES',
      description: 'approve other users advances, expense, and trip reports for projects they own'
    }),

    expenses_access_reports: (data) => ({
      app_id: data.maha_apps.expenses.id,
      text: 'ACCESS REPORTS',
      description: 'access advance, expense, and trip reports'
    })

  }

})

export default rightsFixtures
