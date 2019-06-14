import ActivitySerializer from '../../../serializers/activity_serializer'
import Activity from '../../../../maha/models/activity'

const listRoute = async (req, res) => {

  const activities = await Activity.scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    filterParams: ['app_id','user_id','created_at'],
    searchParams: ['maha_users.first_name','maha_users.last_name','maha_stories.text','object_text']
  }).sort({
    sort: req.query.$sort,
    defaultSort: '-created_at',
    sortParams: ['created_at']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['user.photo','app','story','object_owner'],
    transacting: req.trx
  })

  res.status(200).respond(activities, (activity) => {
    return ActivitySerializer(req, activity)
  })

}

export default listRoute
