import Fixtures from '../../../../core/objects/fixtures'

const notificationsFixtures = new Fixtures({

  tableName: 'maha_notifications',

  records: {

    created_notification: (data) => ({
      team_id: data.maha_teams.acme.id,
      user_id: data.maha_users.lauren_baker.id,
      subject_id: data.maha_users.lauren_baker.id,
      app_id: data.maha_apps.team.id,
      story_id: data.maha_stories.created_story.id,
      object_table: 'maha_users',
      object_text: 'Maribel Walker',
      object_id: data.maha_users.maribel_walker.id
    })

  }

})

export default notificationsFixtures
