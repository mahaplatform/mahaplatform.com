import { Fixtures } from 'maha'

const domainsFixtures = new Fixtures({
  tableName: 'maha_domains',
  records: [
    {
      id: 1,
      team_id: 1,
      name: 'dev.eatfreshny.com',
      is_primary: true
    }
  ]
})

export default domainsFixtures
