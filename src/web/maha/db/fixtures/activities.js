import Fixtures from '../../core/objects/fixtures'
import moment from 'moment'

const activitiesFixtures = new Fixtures({

  tableName: 'maha_activities',

  records: {

    created_activity: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.lauren_baker.id,
      app_id: data.maha_apps.team.id,
      story_id: data.maha_stories.created_story.id,
      object_table: 'maha_users',
      object_text: 'Maribel Walker',
      object_id: data.maha_users.maribel_walker.id,
      url: `/admin/team/users/${data.maha_users.maribel_walker.id}`,
      created_at: moment().subtract(3, 'days'),
      updated_at: moment().subtract(3, 'days')
    })

  }

})

export default activitiesFixtures
