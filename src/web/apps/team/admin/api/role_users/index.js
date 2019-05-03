import { Resources } from '../../../../../core/backframe'
import User from '../../../../maha/models/user'
import UserSerializer from '../../../serializers/user_serializer'
import assign from './assign'

const defaultQuery = (req, trx, qb, options) => {

  qb.innerJoin('maha_users_roles', 'maha_users_roles.user_id', 'maha_users.id')

  qb.where('maha_users_roles.role_id', req.params.role_id)

}

const RoleUersResources = new Resources({
  collectionActions: [
    assign
  ],
  defaultQuery,
  defaultSort: ['last_name'],
  model: User,
  only: 'list',
  path: '/roles/:role_id/users',
  serializer: (req, trx, result) => ({
    user: UserSerializer(req, trx, result)
  }),
  withRelated: ['photo']
})

export default RoleUersResources
