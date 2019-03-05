import { Resources, mailer, User, createUserToken, updateRelated } from 'maha'
import UserSerializer from '../../../serializers/user_serializer'
import activate from './activate'
import signout from './signout'
import disable from './disable'
import access from './access'
import enable from './enable'
import reset from './reset'
import finalize from './finalize'

const activity = story => (req, trx, object, options) => ({
  story,
  object
})

const activities = {
  create: activity('created {object}'),
  update: activity('updated {object}'),
  destroy: activity('deleted {object}')
}

const defaultParams = (req, trx, options) => ({
  is_active: false,
  notifications_enabled: true,
  in_app_notifications_enabled: true,
  notification_sound_enabled: true,
  notification_sound: 'ding',
  push_notifications_enabled: true,
  mute_evenings: true,
  mute_evenings_start_time: '18:00',
  mute_evenings_end_time: '9:00',
  mute_weekends: true,
  values: {}
})

const sendActivationEmail = async (req, trx, user, options) => {

  const token = createUserToken(user, 'activation_id')

  await mailer.enqueue(req, trx, {
    team_id: req.team.get('id'),
    user,
    template: 'team:activation',
    data: {
      first_name: user.get('first_name'),
      activation_url: `${process.env.WEB_HOST}/admin/activate/${token}`
    }
  })

}

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('distinct on ("maha_users"."id","maha_users"."last_name","maha_users"."email") "maha_users".*'))

  qb.leftJoin('maha_users_roles', 'maha_users_roles.user_id', 'maha_users.id')

}

const refresh = {
  create: (req, trx, result, options) => [
    '/admin/team/users'
  ],
  update: (req, trx, result, options) => [
    '/admin/team/users',
    `/admin/team/users/${result.get('id')}`
  ]
}

const messages = {
  update: (req, trx, result, options) => [
    { channel: `/admin/users/${result.get('id')}`, action: 'session' }
  ]
}

const groupFilter = (qb, filter, options) => {

  qb.leftJoin('maha_users_groups', 'maha_users_groups.user_id', 'maha_users.id')

  qb.whereIn('maha_users_groups.group_id', filter.$eq)

}

const roleFilter = (qb, filter, options) => {

  qb.whereIn('maha_users_roles.role_id', filter.$eq)

}

const appFilter = (qb, filter, options) => {

  qb.innerJoin('maha_roles_apps', 'maha_roles_apps.role_id', 'maha_users_roles.role_id')

  qb.whereIn('maha_roles_apps.app_id', filter.$eq)

}

const rightFilter = (qb, filter, options) => {

  qb.innerJoin('maha_roles_rights', 'maha_roles_rights.role_id', 'maha_users_roles.role_id')

  qb.whereIn('maha_roles_rights.right_id', filter.$eq)

}

const userResources = new Resources({
  afterProcessor: {
    create: [
      updateRelated('roles', 'maha_users_roles', 'role_ids', 'user_id', 'role_id'),
      updateRelated('groups', 'maha_users_groups', 'group_ids', 'user_id', 'group_id'),
      updateRelated('supervisors', 'maha_supervisions', 'supervisor_ids', 'employee_id', 'supervisor_id'),
      sendActivationEmail
    ],
    update: [
      updateRelated('roles', 'maha_users_roles', 'role_ids', 'user_id', 'role_id'),
      updateRelated('groups', 'maha_users_groups', 'group_ids', 'user_id', 'group_id'),
      updateRelated('supervisors', 'maha_supervisions', 'supervisor_ids', 'employee_id', 'supervisor_id')
    ]
  },
  activities,
  allowedParams: ['first_name','last_name','email','secondary_email','is_active','email_notification_method','photo_id','values'],
  filterParams: ['is_active'],
  collectionActions: [
    finalize
  ],
  defaultParams,
  defaultSort: 'last_name',
  defaultQuery,
  memberActions: [
    access,
    activate,
    disable,
    enable,
    reset,
    signout
  ],
  messages,
  model: User,
  path: '/users',
  refresh,
  rights: ['team:manage_people'],
  serializer: UserSerializer,
  searchParams: ['first_name','last_name','email'],
  sortParams: ['id','first_name','last_name','email'],
  withRelated: ['photo','roles','groups','supervisors'],
  virtualFilters: {
    group_id: groupFilter,
    role_id: roleFilter,
    app_id: appFilter,
    right_id: rightFilter
  },
  virtualParams: ['role_ids','group_ids','supervisor_ids']
})

export default userResources
