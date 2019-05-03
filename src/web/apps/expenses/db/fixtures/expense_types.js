import Fixtures from '../../../../core/objects/fixtures'

const expenseTypesFixtures = new Fixtures({

  tableName: 'expenses_expense_types',

  records: {

    employee_development_fees: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Employee Development-reg. fees',
      integration: {
        expense_code: '55100'
      }
    }),

    employee_development_travel: (data) => ({
      team_id: data.maha_teams.acme.id,
      title: 'Employee Development-travel',
      integration: {
        expense_code: '55300'
      }
    })

  }

})

export default expenseTypesFixtures
