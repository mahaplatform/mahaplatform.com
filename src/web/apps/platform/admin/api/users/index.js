import { Resources } from '../../../../../core/backframe'
import User from '../../../../maha/models/user'
import UserSerializer from '../../../serializers/user_serializer'

const usersResources = new Resources({
  defaultSort: 'last_name',
  model: User,
  ownedByTeam: false,
  path: '/users',
  serializer: UserSerializer,
  sortParams: ['title', 'subdomain']
})

export default usersResources
