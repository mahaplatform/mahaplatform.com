import { Resources } from '../../../../../core/backframe'
import Group from '../../../../maha/models/group'
import GroupSerializer from '../../../serializers/group_serializer'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const activities = {
  create: activity('created {object}'),
  update: activity('updated {object}'),
  destroy: activity('deleted {object}')
}

const refresh = {
  create: (req, trx, result, options) => [
    '/admin/team/groups'
  ],
  update: (req, trx, result, options) => [
    '/admin/team/groups',
    `/admin/team/groups/${result.get('id')}`
  ]
}

const groupResources = new Resources({
  activities,
  allowedParams: ['title'],
  filterParams: ['title'],
  model: Group,
  name: 'group',
  path: '/groups',
  rights: ['team:manage_people'],
  searchParams: ['title'],
  serializer: GroupSerializer,
  sortParams: ['id','title'],
  refresh,
  withRelated: ['users']
})

export default groupResources
