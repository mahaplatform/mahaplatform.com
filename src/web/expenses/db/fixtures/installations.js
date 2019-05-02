import { Fixtures } from 'maha'

const installationsFixtures = new Fixtures({

  tableName: 'maha_installations',

  records: {

    acme_expenses_installation: (data) => ({
      team_id: data.maha_teams.acme.id,
      app_id: data.maha_apps.expenses.id,
      settings: {
        mileage_rate: 0.535,
        integration: 'accpac',
        trip_expense_type_id: data.maha_expense_types.employee_development_travel.id
      }
    }),

    soylent_expenses_installation: (data) => ({
      team_id: data.maha_teams.soylent.id,
      app_id: data.maha_apps.expenses.id,
      settings: {
        mileage_rate: 0.535,
        integration: 'accpac',
        trip_expense_type_id: null
      }
    })

  }

})

export default installationsFixtures
