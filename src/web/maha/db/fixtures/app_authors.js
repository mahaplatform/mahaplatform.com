import Fixtures from '../../core/objects/fixtures'

const appAuthorsFixtures = new Fixtures({

  tableName: 'maha_app_authors',

  records: {

    cce_tompkins: (data) => ({
      name: 'CCE Tompkins'
    })

  }

})

export default appAuthorsFixtures
