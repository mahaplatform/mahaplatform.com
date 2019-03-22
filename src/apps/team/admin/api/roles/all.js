import { ListRoute, User } from 'maha'
import UserSerializer from '../../../serializers/user_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('distinct on ("maha_users"."id","maha_users"."last_name") "maha_users".*'))

  qb.leftJoin('maha_users_groups', 'maha_users_groups.user_id', 'maha_users.id')

}

const allRoleListRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['last_name'],
  filterParams: ['group_id'],
  method: 'get',
  model: User,
  name: 'all',
  path: '/users/all',
  serializer: UserSerializer,
  searchParams: ['first_name','last_name'],
  withRelated: ['photo']
})

export default allRoleListRoute
