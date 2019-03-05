import { Fixtures } from 'maha'

const appsFixtures = new Fixtures({

  tableName: 'maha_apps',

  records: [
    {
      id: 5,
      title: 'Chat',
      app_category_id: 1,
      app_author_id: 1,
      description: 'Organization chat',
      version: '1.0.0',
      color: 'purple',
      icon: 'comments'
    }
  ]

})

export default appsFixtures
