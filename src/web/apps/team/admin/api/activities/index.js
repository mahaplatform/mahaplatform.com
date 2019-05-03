import { Resources } from '../../../../../core/backframe'
import Activity from '../../../../maha/models/activity'
import ActivitySerializer from '../../../serializers/activity_serializer'

const activityResources = new Resources({
  filterParams: ['app_id','user_id','created_at'],
  method: 'get',
  model: Activity,
  only: ['list'],
  path: '/activities',
  rights: ['team:manage_team'],
  serializer: ActivitySerializer,
  searchParams: ['maha_users.first_name','maha_users.last_name','maha_stories.text','object_text'],
  sortParams: 'created_at',
  withRelated: ['user.photo','app','story','object_owner']
})

export default activityResources
