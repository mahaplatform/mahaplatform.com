import { Resources } from '../../../server'
import Profile from '../../../models/profile'
import ProfileSerializer from '../../../serializers/profile_serializer'

const refresh = {
  destroy: (req, trx, result, options) => [
    { channel: 'user', target: '/admin/account/profiles' }
  ]
}

const profilesResources = new Resources({
  model: Profile,
  path: '/profiles',
  refresh,
  serializer: ProfileSerializer,
  withRelated: ['source']
})

export default profilesResources
