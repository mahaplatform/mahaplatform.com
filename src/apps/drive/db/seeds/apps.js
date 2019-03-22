import { Fixtures } from 'maha'

const appsFixtures = new Fixtures({

  tableName: 'maha_apps',

  records: [
    {
      id: 6,
      title: 'Drive',
      app_category_id: 1,
      app_author_id: 1,
      description: 'Organizational File System',
      version: '1.0.0',
      color: 'teal',
      icon: 'hdd-o'
    }
  ]

})

export default appsFixtures
