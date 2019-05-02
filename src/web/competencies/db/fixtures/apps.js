import { Fixtures } from 'maha'

const appFixtures = new Fixtures({

  tableName: 'maha_apps',

  records: {

    competencies: (data) => ({
      title: 'Competencies',
      app_category_id: data.maha_app_categories.education.id,
      app_author_id: data.maha_app_authors.cce_tompkins.id,
      description: 'Manage resources required for various job positions',
      version: '1.0.0',
      color: 'blue',
      icon: 'trophy'
    })

  }

})

export default appFixtures
