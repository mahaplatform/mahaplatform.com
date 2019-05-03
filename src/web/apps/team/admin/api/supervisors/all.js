import { Resources } from '../../../../../core/backframe'
import User from '../../../../maha/models/user'
import UserSerializer from '../../../serializers/user_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.leftJoin('maha_supervisors', 'maha_supervisors.user_id', 'maha_users.id')

  qb.whereNull('maha_supervisors.id')

}

const supervisorAllEmployeesListRoute = new Resources({
  defaultQuery,
  defaultSort: ['last_name'],
  model: User,
  only: ['list'],
  path: '/supervisors/all',
  serializer: UserSerializer,
  searchParams: ['first_name','last_name'],
  withRelated: ['photo']
})

export default supervisorAllEmployeesListRoute
