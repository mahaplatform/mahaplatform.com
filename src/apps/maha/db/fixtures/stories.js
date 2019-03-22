import Fixtures from '../../core/objects/fixtures'

const storiesFixtures = new Fixtures({

  tableName: 'maha_stories',

  records: {

    created_story: (data) => ({
      text: 'created {object}'
    }),

    updated_story: (data) => ({
      text: 'updated {object}'
    }),

    deleted_story: (data) => ({
      text: 'deleted {object}'
    })

  }

})

export default storiesFixtures
