import Fixtures from '../../../../core/objects/fixtures'

const appsFixtures = new Fixtures({

  tableName: 'maha_apps',

  records: {

    chat: (data) => ({
      title: 'Chat',
      app_category_id: data.maha_app_categories.communiction.id,
      app_author_id: data.maha_app_authors.cce_tompkins.id,
      description: 'Organization chat',
      version: '1.0.0',
      color: 'purple',
      icon: 'comments'
    })

  }

})

export default appsFixtures
