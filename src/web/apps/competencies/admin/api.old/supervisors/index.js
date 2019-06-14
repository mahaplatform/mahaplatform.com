import { Resources } from '../../../../../core/backframe'
import User from '../../../../maha/models/user'
import UserSerializer from '../../../serializers/user_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.leftJoin('maha_supervisions', 'maha_supervisions.supervisor_id', 'maha_users.id')

  qb.where('maha_supervisions.employee_id', req.user.get('id'))

}

const supervisorAllEmployeesListRoute = new Resources({
  defaultQuery,
  defaultSort: ['last_name'],
  model: User,
  only: ['list'],
  path: '/supervisors',
  serializer: UserSerializer,
  searchParams: ['first_name','last_name'],
  withRelated: ['photo']
})

export default supervisorAllEmployeesListRoute
