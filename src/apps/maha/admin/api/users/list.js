import UserSerializer from '@apps/maha/serializers/user_serializer'
import User from '@apps/maha/models/user'

const listRoute = async (req, res) => {

  const users = await User.filterFetch({
    scope: (qb) => {
      qb.select(req.trx.raw('distinct on (maha_users.id, maha_users.first_name, maha_users.last_name, maha_users.email) maha_users.*'))
      qb.leftJoin('maha_users_roles', 'maha_users_roles.user_id', 'maha_users.id')
      qb.leftJoin('maha_roles_apps', 'maha_roles_apps.role_id', 'maha_users_roles.role_id')
      qb.leftJoin('maha_roles_rights', 'maha_roles_rights.role_id', 'maha_users_roles.role_id')
      qb.where('team_id', req.team.get('id'))
    },
    aliases: {
      app_id: 'maha_roles_apps.app_id',
      right_id: 'maha_roles_rights.right_id'
    },
    filter: {
      params: req.query.$filter,
      search: ['first_name','last_name','email'],
      allowed: ['app_id,right_id,is_active']
    },
    sort: {
      params: req.query.$sort,
      defaults: 'last_name',
      allowed: ['id','first_name','last_name','email']
    },
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  await res.status(200).respond(users, UserSerializer)

}

export default listRoute
