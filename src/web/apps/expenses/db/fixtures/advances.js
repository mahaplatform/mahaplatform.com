import Fixtures from '../../../../core/objects/fixtures'
import moment from 'moment'

const advancesFixtures = new Fixtures({

  tableName: 'expenses_advances',

  records: {

    advance1: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.lauren_baker.id,
      project_id: data.expenses_projects.widget_prototype.id,
      expense_type_id: data.expenses_expense_types.employee_development_fees.id,
      vendor_id: data.expenses_vendors.walmart.id,
      status_id: data.expenses_statuses.approved.id,
      delivery_method: 'pickup',
      date_needed: moment().add(6, 'days').format('YYYY-MM-DD'),
      amount: 60.00,
      description: 'Party expenses',
      created_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }),

    advance2: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.lauren_baker.id,
      project_id: data.expenses_projects.widget_prototype.id,
      expense_type_id: data.expenses_expense_types.employee_development_fees.id,
      vendor_id: data.expenses_vendors.wegmans.id,
      status_id: data.expenses_statuses.rejected.id,
      delivery_method: 'pickup',
      date_needed: moment().add(12, 'days').format('YYYY-MM-DD'),
      amount: 60.00,
      description: 'Party expenses',
      created_at: moment().subtract(14, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(14, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }),

    advance3: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.gracie_bechtelar.id,
      project_id: data.expenses_projects.website_app.id,
      expense_type_id: data.expenses_expense_types.employee_development_fees.id,
      vendor_id: data.expenses_vendors.walmart.id,
      status_id: data.expenses_statuses.submitted.id,
      delivery_method: 'pickup',
      date_needed: moment().add(8, 'days').format('YYYY-MM-DD'),
      amount: 60.00,
      description: 'Party expenses',
      created_at: moment().subtract(6, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(6, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }),

    advance4: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.kacey_boyle.id,
      project_id: data.expenses_projects.website_app.id,
      expense_type_id: data.expenses_expense_types.employee_development_fees.id,
      vendor_id: data.expenses_vendors.target.id,
      status_id: data.expenses_statuses.pending.id,
      delivery_method: 'pickup',
      date_needed: moment().add(8, 'days').format('YYYY-MM-DD'),
      amount: 60.00,
      description: 'Party expenses',
      created_at: moment().subtract(6, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(6, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }),

    advance5: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.lauren_baker.id,
      project_id: data.expenses_projects.factory.id,
      expense_type_id: data.expenses_expense_types.employee_development_fees.id,
      vendor_id: data.expenses_vendors.target.id,
      status_id: data.expenses_statuses.pending.id,
      delivery_method: 'pickup',
      date_needed: moment().add(8, 'days').format('YYYY-MM-DD'),
      amount: 90.00,
      description: 'Party expenses',
      created_at: moment().subtract(6, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(6, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    })

  }

})

export default advancesFixtures
