import { Resources, User } from 'maha'
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
