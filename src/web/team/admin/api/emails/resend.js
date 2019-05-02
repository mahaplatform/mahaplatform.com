import { Route } from 'maha'

const activity = story => (req, trx, object, options) => ({
  story: 'resent {object}',
  object
})

const processor = async (req, trx, options) => true

const refresh = (req, trx, result, options) => [
  `/admin/team/emails/${req.resource.get('id')}`
]

const signoutRoute = new Route({
  action: 'resend',
  activity,
  method: 'patch',
  path: '/resend',
  processor,
  refresh
})

export default signoutRoute
