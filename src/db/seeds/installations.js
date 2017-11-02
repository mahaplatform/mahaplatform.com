import { Fixtures } from 'maha'

const installationsFixtures = new Fixtures({
  tableName: 'maha_installations',
  records: [
    {
      id: 1,
      team_id: 1,
      app_id: 1,
      settings: {}
    }, {
      id: 2,
      team_id: 1,
      app_id: 2,
      settings: {
        mileage_rate: 0.535,
        integration: 'accpac',
        trip_expense_type_id: 16
      }
    }, {
      id: 3,
      team_id: 1,
      app_id: 3,
      settings: {}
    }, {
      id: 4,
      team_id: 1,
      app_id: 4,
      settings: {}
    }
  ]
})

export default installationsFixtures
