import { Fixtures } from 'maha'

const appsFixtures = new Fixtures({
  tableName: 'maha_apps',
  records: [
    {
      id: 1,
      title: 'Team',
      app_category_id: 1,
      app_author_id: 1
    }, {
      id: 2,
      title: 'Expenses',
      app_category_id: 4,
      app_author_id: 1
    }, {
      id: 3,
      title: 'Competencies',
      app_category_id: 3,
      app_author_id: 1
    }, {
      id: 4,
      title: 'Eat Fresh',
      app_category_id: 3,
      app_author_id: 1
    }
  ]
})

export default appsFixtures
