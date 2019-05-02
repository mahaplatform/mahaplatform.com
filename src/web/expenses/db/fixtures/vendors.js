import { Fixtures } from 'maha'
import moment from 'moment'

const vendorsFixtures = new Fixtures({

  tableName: 'expenses_vendors',

  records: {

    walmart: (data) => ({
      team_id: data.maha_teams.acme.id,
      name: 'Walmart',
      created_at: moment().subtract(10, 'months'),
      updated_at: moment().subtract(10, 'months')
    }),

    target: (data) => ({
      team_id: data.maha_teams.acme.id,
      name: 'Target',
      created_at: moment().subtract(9, 'months'),
      updated_at: moment().subtract(9, 'months')
    }),

    wegmans: (data) => ({
      team_id: data.maha_teams.acme.id,
      name: 'Wegmans',
      created_at: moment().subtract(8, 'months'),
      updated_at: moment().subtract(8, 'months')
    })

  }

})

export default vendorsFixtures
