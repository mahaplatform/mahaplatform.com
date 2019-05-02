import { Resources, User } from 'maha'
import UserSerializer from '../../../serializers/user_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.select(options.knex.raw('distinct on ("maha_supervisions"."employee_id","maha_users"."last_name") "maha_users".*'))

  qb.innerJoin('maha_supervisions', 'maha_supervisions.employee_id', 'maha_users.id')

  qb.where('maha_supervisions.supervisor_id', req.user.get('id'))

}

const employeeResources = new Resources({
  defaultQuery,
  defaultSort: ['last_name'],
  model: User,
  name: 'employee',
  only: ['list','show'],
  path: '/employees',
  searchParams: ['first_name','last_name'],
  serializer: UserSerializer,
  sortParams: ['last_name'],
  withRelated: ['photo']
})

export default employeeResources
