import Fixtures from '../../../../core/objects/fixtures'
import moment from 'moment'

const tripsFixtures = new Fixtures({

  tableName: 'expenses_trips',

  records: {

    trip1: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.lauren_baker.id,
      project_id: data.expenses_projects.widget_prototype.id,
      status_id: data.expenses_statuses.approved.id,
      date: moment().subtract(6, 'days').format('YYYY-MM-DD'),
      description: 'driving',
      time_leaving: '10:00:00',
      time_arriving: '11:00:00',
      odometer_start: 102150,
      odometer_end: 102295,
      total_miles: 145,
      mileage_rate: 2.50,
      amount: 362.50,
      created_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }),

    trip2: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.lauren_baker.id,
      project_id: data.expenses_projects.widget_prototype.id,
      status_id: data.expenses_statuses.rejected.id,
      date: moment().subtract(6, 'days').format('YYYY-MM-DD'),
      description: 'driving',
      time_leaving: '10:00:00',
      time_arriving: '11:00:00',
      odometer_start: 102150,
      odometer_end: 102295,
      total_miles: 145,
      mileage_rate: 2.50,
      amount: 362.50,
      created_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(16, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    }),

    trip3: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.kacey_boyle.id,
      project_id: data.expenses_projects.website_app.id,
      status_id: data.expenses_statuses.submitted.id,
      date: moment().subtract(10, 'days').format('YYYY-MM-DD'),
      description: 'driving',
      time_leaving: '10:00:00',
      time_arriving: '11:00:00',
      odometer_start: 102150,
      odometer_end: 102295,
      total_miles: 42,
      mileage_rate: 2.50,
      amount: 105.00,
      created_at: moment().subtract(15, 'days').format('YYYY-MM-DD HH:MM:ss ZZ'),
      updated_at: moment().subtract(15, 'days').format('YYYY-MM-DD HH:MM:ss ZZ')
    })

  }

})

export default tripsFixtures
