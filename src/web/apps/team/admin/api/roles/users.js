import { Resources } from '../../../../../core/backframe'
import User from '../../../../maha/models/user'
import UserSerializer from '../../../serializers/user_serializer'
import assign from './assign'
import ids from './ids'

const defaultQuery = (req, trx, qb, options) => {

  qb.innerJoin('maha_users_roles', 'maha_users_roles.user_id', 'maha_users.id')

  qb.whereRaw('"maha_users_roles"."role_id" = ?', req.params.role_id)

}

const userResources = new Resources({
  collectionActions: [
    assign,
    ids
  ],
  defaultQuery,
  defaultSort: ['last_name'],
  model: User,
  path: '/users',
  only: ['list'],
  serializer: UserSerializer,
  withRelated: ['photo']
})

export default userResources
