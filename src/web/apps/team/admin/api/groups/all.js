import { ListRoute } from '../../../../../core/backframe'
import User from '../../../../maha/models/user'
import UserSerializer from '../../../serializers/user_serializer'

const groupAllUsersListRoute = new ListRoute({
  defaultSort: ['last_name'],
  method: 'get',
  model: User,
  path: '/users/all',
  serializer: UserSerializer,
  searchParams: ['first_name','last_name'],
  withRelated: ['photo']
})

export default groupAllUsersListRoute
