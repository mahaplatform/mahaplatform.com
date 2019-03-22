import { Resources, User } from 'maha'
import UserSerializer from '../../../serializers/user_serializer'
import assign from './assign'
import ids from './ids'

const defaultQuery = (req, trx, qb, options) => {

  qb.innerJoin('maha_users_groups', 'maha_users_groups.user_id', 'maha_users.id')

  qb.whereRaw('"maha_users_groups"."group_id" = ?', req.params.group_id)

}

const userResources = new Resources({
  collectionActions: [
    assign,
    ids    
  ],
  defaultQuery,
  defaultSort: ['last_name'],
  model: User,
  only: ['list'],
  path: '/users',
  serializer: UserSerializer,
  withRelated: ['photo']
})

export default userResources
