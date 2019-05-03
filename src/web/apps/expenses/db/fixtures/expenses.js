import Fixtures from '../../../../core/objects/fixtures'
import moment from 'moment'

const expensesFixtures = new Fixtures({

  tableName: 'expenses_expenses',

  records: {

    expense1: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.lauren_baker.id,
      project_id: data.expenses_projects.widget_prototype.id,
      expense_type_id: data.expenses_expense_types.employee_development_fees.id,
      vendor_id: data.expenses_vendors.walmart.id,
      status_id: data.expenses_statuses.approved.id,
      date: '2017-01-01',
      description: 'test',
      amount: 45.22,
      created_at: moment().subtract(25, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(25, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }),

    expense2: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.kacey_boyle.id,
      project_id: data.expenses_projects.website_app.id,
      expense_type_id: data.expenses_expense_types.employee_development_fees.id,
      vendor_id: data.expenses_vendors.target.id,
      status_id: data.expenses_statuses.submitted.id,
      date: '2017-01-01',
      description: 'test',
      amount: 83.62,
      created_at: moment().subtract(20, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(20, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }),

    expense3: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.blair_schmidt.id,
      project_id: data.expenses_projects.website_app.id,
      expense_type_id: data.expenses_expense_types.employee_development_fees.id,
      vendor_id: data.expenses_vendors.walmart.id,
      status_id: data.expenses_statuses.submitted.id,
      date: '2017-01-01',
      description: 'test',
      amount: 98.25,
      created_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }),

    expense4: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.lauren_baker.id,
      project_id: data.expenses_projects.website_app.id,
      expense_type_id: data.expenses_expense_types.employee_development_fees.id,
      vendor_id: data.expenses_vendors.walmart.id,
      status_id: data.expenses_statuses.rejected.id,
      date: '2017-01-01',
      description: 'test',
      amount: 44.06,
      created_at: moment().subtract(12, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(12, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }),

    expense5: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.lauren_baker.id,
      project_id: data.expenses_projects.website_app.id,
      expense_type_id: data.expenses_expense_types.employee_development_travel.id,
      vendor_id: data.expenses_vendors.wegmans.id,
      status_id: data.expenses_statuses.pending.id,
      date: '2017-01-01',
      description: 'test',
      amount: 38.27,
      created_at: moment().subtract(10, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(10, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    })

  }

})

export default expensesFixtures
