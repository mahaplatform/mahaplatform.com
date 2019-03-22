import Fixtures from '../../core/objects/fixtures'

const appCategoriesFixtures = new Fixtures({

  tableName: 'maha_app_categories',

  records: {

    administration: (data) => ({
      title: 'administration'
    }),

    communication: (data) => ({
      title: 'communication'
    }),

    education: (data) => ({
      title: 'education'
    }),

    finance: (data) => ({
      title: 'finance'
    }),

    management: (data) => ({
      title: 'management'
    }),

    productivity: (data) => ({
      title: 'productivity'
    })

  }

})

export default appCategoriesFixtures
