import { Resources, User } from 'maha'
import UserSerializer from '../../../serializers/user_serializer'
import assign from './assign'

const defaultQuery = (req, trx, qb, options) => {

  qb.innerJoin('maha_users_groups', 'maha_users_groups.user_id', 'maha_users.id')

  qb.where('maha_users_groups.group_id', req.params.group_id)

}

const groupUersResources = new Resources({
  collectionActions: [
    assign
  ],
  defaultQuery,
  defaultSort: ['last_name'],
  model: User,
  only: 'list',
  path: '/groups/:group_id/users',
  serializer: (req, trx, result) => ({
    user: UserSerializer(req, trx, result)
  }),
  withRelated: ['photo']
})

export default groupUersResources
