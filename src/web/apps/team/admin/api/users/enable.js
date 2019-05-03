import { Route } from '../../../../../core/backframe'
import User from '../../../../maha/models/user'
import UserSerializer from '../../../serializers/user_serializer'

const activity = (req, trx, result, options) => ({
  story: 'enabled {object}',
  object: req.resource
})

const processor = async (req, trx, options) => {

  req.resource = await User.where({ id: req.params.id }).fetch()

  await req.resource.save({ is_active: true }, { patch: true, transacting: trx })

  return UserSerializer(req, trx, req.resource)

}

const refresh = (req, trx, result, options) => ({
  channel: 'team',
  target: [
    '/admin/team/users',
    `/admin/team/users/${req.params.id}`
  ]
})

const enableRoute = new Route({
  action: 'enable',
  activity,
  method: 'patch',
  path: '/enable',
  processor,
  refresh
})

export default enableRoute
