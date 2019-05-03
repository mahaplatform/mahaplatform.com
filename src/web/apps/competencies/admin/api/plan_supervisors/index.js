import User from '../../../../maha/models/user'
import { ListRoute } from '../../../../../core/backframe'
import UserSerializer from '../../../serializers/user_serializer'

const defaultQuery = (req, trx, qb, options) => {

  qb.innerJoin('maha_supervisions', 'maha_supervisions.supervisor_id', 'maha_users.id')

  qb.where('maha_supervisions.employee_id', req.user.get('id'))

}

const planSupervisorsListRoute = new ListRoute({
  defaultQuery,
  defaultSort: ['last_name'],
  model: User,
  method: 'get',
  name: 'supervisor',
  path: '/plans/supervisors',
  serializer: UserSerializer,
  searchParams: ['first_name','last_name'],
  withRelated: ['photo']
})

export default planSupervisorsListRoute
