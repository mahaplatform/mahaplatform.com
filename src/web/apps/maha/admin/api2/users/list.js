import UserSerializer from '../../../serializers/user_serializer'
import knex from '../../../../../core/services/knex'
import User from '../../../models/user'

const listRoute = async (req, res) => {

  const users = await User.query(qb => {
    qb.select(knex.raw('distinct on (maha_users.id, maha_users.first_name, maha_users.last_name, maha_users.email) maha_users.*'))
    qb.leftJoin('maha_users_roles', 'maha_users_roles.user_id', 'maha_users.id')
    qb.leftJoin('maha_roles_apps', 'maha_roles_apps.role_id', 'maha_users_roles.role_id')
    qb.leftJoin('maha_roles_rights', 'maha_roles_rights.role_id', 'maha_users_roles.role_id')
    qb.where('is_active', true)
  }).scope({
    team: req.team
  }).filter({
    filter: req.query.$filter,
    searchParams: ['first_name','last_name','email'],
    virtualFilters: {
      app_id: (qb, filter) => {
        if(!filter.$in) return
        qb.whereIn('maha_roles_apps.app_id', filter.$in)
      },
      right_id: (qb, filter) => {
        if(!filter.$in) return
        qb.whereIn('maha_roles_rights.right_id', filter.$in)
      }
    }
  }).sort({
    sort: req.query.$sort,
    defaultSort: 'last_name',
    sortParams: ['id','first_name','last_name','email']
  }).fetchPage({
    page: req.query.$page,
    withRelated: ['photo'],
    transacting: req.trx
  })

  res.status(200).respond(users, (user) => UserSerializer(req, req.trx, user))

}

export default listRoute
