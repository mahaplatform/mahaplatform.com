import { Resources } from '../../../server'
import User from '../../../models/user'
import UserSerializer from '../../../serializers/user_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('distinct on (maha_users.id, maha_users.first_name, maha_users.last_name, maha_users.email) maha_users.*'))

  qb.innerJoin('maha_users_roles', 'maha_users_roles.user_id', 'maha_users.id')

  qb.where('is_active', true)

}

const appFilter = (qb, filter, options) => {

  qb.innerJoin('maha_roles_apps', 'maha_roles_apps.role_id', 'maha_users_roles.role_id')

  qb.whereIn('maha_roles_apps.app_id', filter.$eq)

}

const rightFilter = (qb, filter, options) => {

  qb.innerJoin('maha_roles_rights', 'maha_roles_rights.role_id', 'maha_users_roles.role_id')

  qb.whereIn('maha_roles_rights.right_id', filter.$eq)

}

const usersResources = new Resources({
  defaultQuery,
  defaultSort: 'last_name',
  model: User,
  path: '/users',
  only: ['list'],
  searchParams: ['first_name','last_name','email'],
  serializer: UserSerializer,
  sortParams: ['id','first_name','last_name','email'],
  virtualFilters: {
    app_id: appFilter,
    right_id: rightFilter
  },
  withRelated: ['photo']
})

export default usersResources
