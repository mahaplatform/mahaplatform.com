import Fixtures from '../../../../core/objects/fixtures'

const appsFixtures = new Fixtures({

  tableName: 'maha_apps',

  records: {

    team: (data) => ({
      title: 'Team',
      app_category_id: data.maha_app_categories.administration.id,
      app_author_id: data.maha_app_authors.cce_tompkins.id,
      description: 'Manage platform configuration, users, apps, and access',
      version: '1.0.0',
      color: 'red',
      icon: 'users'
    })

  }

})

export default appsFixtures
