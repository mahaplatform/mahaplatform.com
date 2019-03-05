import UserSerializer from '../../../serializers/user_serializer'
import { Resources, User } from 'maha'
import assign from './assign'

const defaultQuery = (req, trx, qb, options) => {

  qb.innerJoin('maha_supervisions', 'maha_supervisions.employee_id', 'maha_users.id')

  qb.innerJoin('maha_supervisors', 'maha_supervisors.user_id', 'maha_supervisions.supervisor_id')

  qb.where('maha_supervisors.id', req.params.supervisor_id)

}

const supervisorEmployeeResources = new Resources({
  collectionActions: [
    assign
  ],
  defaultQuery,
  defaultSort: ['last_name'],
  model: User,
  only: 'list',
  path: '/supervisors/:supervisor_id/users',
  serializer: (req, trx, results) => ({
    user: UserSerializer(req, trx, results)
  }),
  withRelated: ['photo']
})

export default supervisorEmployeeResources
