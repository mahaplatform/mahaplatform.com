import { Fixtures } from 'maha'

const installationsFixtures = new Fixtures({

  tableName: 'maha_installations',

  records: [
    {
      id: 6,
      team_id: 1,
      app_id: 6,
      settings: {}      
    }
  ]

})

export default installationsFixtures
