import { Fixtures } from 'maha'

const postFixtures = new Fixtures({
  tableName: 'maha_posts',
  records: [
    {
      id: 1,
      team_id: 1,
      user_id: 79,
      text: '<h2>Welcome to Maha</h2><p>After almost a full year of development, the Maha Platform is finally live! Thank you to everyone who has assisted with brainstorming, design, testing, feedback, and moral support. I\'m looking forward to continuing the development of this platform for the benefit of the whole cooperative extension!</p>',
      created_at: '2017-11-03T21:30:00.955Z'
    }
  ]
})

export default postFixtures
