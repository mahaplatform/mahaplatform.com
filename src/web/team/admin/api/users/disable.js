import { Route, User } from 'maha'
import UserSerializer from '../../../serializers/user_serializer'

const activity = (req, trx, result, options) => ({
  story: 'disabled {object}',
  object: req.resource
})

const processor = async (req, trx, options) => {

  req.resource = await User.where({ id: req.params.id }).fetch()

  await req.resource.save({ is_active: false }, { patch: true, transacting: trx })

  return UserSerializer(req, trx, req.resource)

}

const refresh = (req, trx, result, options) => ({
  channel: 'team',
  target: [
    '/admin/team/users',
    `/admin/team/users/${req.params.id}`
  ]
})

const disableRoute = new Route({
  action: 'disable',
  activity,
  method: 'patch',
  path: '/disable',
  processor,
  refresh
})

export default disableRoute
