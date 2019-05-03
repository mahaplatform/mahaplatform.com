import Fixtures from '../../../../core/objects/fixtures'

const appsFixtures = new Fixtures({

  tableName: 'maha_apps',

  records: {

    expenses: (data) => ({
      title: 'Expenses',
      app_category_id: data.maha_app_categories.finance.id,
      app_author_id: data.maha_app_authors.cce_tompkins.id,
      description: 'Manage expenses for expenses, advances, and vehicle trips',
      version: '1.0.0',
      color: 'green',
      icon: 'dollar'
    })

  }

})

export default appsFixtures
