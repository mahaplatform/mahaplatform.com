import UserSerializer from '../../../serializers/user_serializer'
import User from '../../../../maha/models/user'

const listRoute = async (req, res) => {

  const users = await User.filter({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on ("maha_users"."id","maha_users"."last_name","maha_users"."email") "maha_users".*'))
      qb.leftJoin('maha_users_roles', 'maha_users_roles.user_id', 'maha_users.id')
      qb.leftJoin('maha_roles_apps', 'maha_roles_apps.role_id', 'maha_users_roles.role_id')
      qb.leftJoin('maha_roles_rights', 'maha_roles_rights.role_id', 'maha_users_roles.role_id')
      qb.leftJoin('maha_users_groups', 'maha_users_groups.user_id', 'maha_users.id')
      qb.where('maha_users.team_id', req.team.get('id'))
    },
    filter: req.query.$filter,
    filterParams: ['app_id','group_id','is_active','right_id','role_id','user_type_id'],
    searchParams: ['first_name','last_name','email'],
    virtualFilters: {
      app_id: (qb, filter) => {
        if(!filter.$in) return
        qb.whereIn('maha_roles_apps.app_id', [filter.$in])
      },
      group_id: (qb, filter) => {
        if(!filter.$eq) return
        qb.whereIn('maha_users_groups.group_id', [filter.$eq])
      },
      right_id: (qb, filter) => {
        if(!filter.$in) return
        qb.whereIn('maha_roles_rights.right_id', [filter.$in])
      },
      role_id: (qb, filter) => {
        if(!filter.$eq) return
        qb.whereIn('maha_users_roles.role_id', [filter.$eq])
      }
    },
    sort: req.query.$sort,
    defaultSort: 'last_name',
    sortParams: ['id','first_name','last_name','email']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo','roles','groups','supervisors'],
    transacting: req.trx
  })

  res.status(200).respond(users, UserSerializer)

}

export default listRoute
