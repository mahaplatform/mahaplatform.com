import { Route } from '../../../../../core/backframe'
import { sendUserActivation } from '../../../services/users'

const activity = (req, trx, object, options) => ({
  story: 'resent an activation email to {object}',
  object: req.resource
})

const processor = async (req, trx, options) => {

  await sendUserActivation(req, trx, req.resource)

  return {}

}

const resetRoute = new Route({
  action: 'activate',
  activity,
  method: 'patch',
  path: '/activate',
  processor
})

export default resetRoute
