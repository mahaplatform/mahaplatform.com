import { Fixtures } from 'maha'

const installationsFixtures = new Fixtures({

  tableName: 'maha_installations',

  records: [
    {
      id: 5,
      team_id: 1,
      app_id: 5,
      settings: {}      
    }
  ]

})

export default installationsFixtures
