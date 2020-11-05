import ActivitySerializer from '@apps/team/serializers/activity_serializer'
import Activity from '@apps/maha/models/activity'

const listRoute = async (req, res) => {

  const activities = await Activity.filterFetch({
    scope: (qb) => {
      qb.innerJoin('maha_users', 'maha_users.id', 'maha_activities.user_id')
      qb.innerJoin('maha_stories', 'maha_stories.id', 'maha_activities.story_id')
    },
    filter: {
      params: req.query.$filter,
      allowed: ['app_id','user_id','created_at'],
      search: ['maha_users.first_name','maha_users.last_name','maha_stories.text','object_text']
    },
    sort: {
      params: req.query.$sort,
      defaults: '-created_at',
      allowed: ['created_at']
    },
    page: req.query.$page,
    withRelated: ['user.photo','app','story','object_owner','team.logo'],
    transacting: req.trx
  })

  res.status(200).respond(activities, ActivitySerializer)

}

export default listRoute
