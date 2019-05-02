import { Resources, Role, updateRelated } from 'maha'
import RoleSerializer from '../../../serializers/role_serializer'
import access from './access'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const activities = {
  create: activity('created {object}'),
  update: activity('updated {object}'),
  destroy: activity('deleted {object}')
}

const messages = {
  update: (req, trx, result, options) => result.related('users').map(user => ({
    channel: 'user',
    action: 'session'
  }))
}

const refresh = {
  update: (req, trx, result, options) => [
    `/admin/team/roles/${result.get('id')}`
  ]
}

const afterProcessor = [
  updateRelated('apps', 'maha_roles_apps', 'assignments.app_ids', 'role_id', 'app_id'),
  updateRelated('rights', 'maha_roles_rights', 'assignments.right_ids', 'role_id', 'right_id')
]

const rolesResources = new Resources({
  activities,
  allowedParams: ['title','description'],
  afterProcessor: {
    create: afterProcessor,
    update: afterProcessor
  },
  filterParams: ['title'],
  memberActions: [
    access
  ],
  messages,
  model: Role,
  name: 'role',
  path: '/roles',
  refresh,
  rights: ['team:manage_people'],
  searchParams: ['title'],
  serializer: RoleSerializer,
  sortParams: ['id','title'],
  withRelated: ['apps','rights','users.photo'],
  virtualParams: ['assignments']
})

export default rolesResources
