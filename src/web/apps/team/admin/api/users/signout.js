import { Route } from '../../../../../core/backframe'
import moment from 'moment'

const activity = (req, trx, object, options) => ({
  story: 'signed {object} out of all devices',
  object
})

const processor = async (req, trx, options) => {

  const user = req.resource

  await user.save({ invalidated_at: moment() }, { patch: true, transacting: trx })

  return {}

}

const messages = (req, trx, result, options) => [
  { channel: `/admin/users/${req.resource.get('id')}`, action: 'signout' }
]

const signoutRoute = new Route({
  action: 'signout',
  activity,
  messages,
  method: 'patch',
  path: '/signout',
  processor
})

export default signoutRoute
