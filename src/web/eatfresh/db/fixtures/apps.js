import { Fixtures } from 'maha'

const appsFixtures = new Fixtures({

  tableName: 'maha_apps',

  records: {

    eatfresh: (data) => ({
      title: 'Eat Fresh',
      app_category_id: data.maha_app_categories.education.id,
      app_author_id: data.maha_app_authors.cce_tompkins.id,
      description: 'Help tourists find local food and farm resources',
      version: '1.0.0',
      color: 'orange',
      icon: 'spoon'      
    })

  }

})

export default appsFixtures
