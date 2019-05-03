import { createUserToken } from '../../../../../core/utils/user_tokens'
import mailer from '../../../../maha/queues/mailer_queue'
import { Route } from '../../../../../core/backframe'

const activity = (req, trx, result, options) => ({
  story: 'reset {object}',
  object_owner_id: req.resource.get('id'),
  object_text: 'password'
})

const processor = async (req, trx, options) => {

  const user = req.resource

  const token = createUserToken(user, 'reset_id')

  await mailer.enqueue(req, trx, {
    team_id: req.team.get('id'),
    user,
    template: 'team:reset',
    data: {
      first_name: user.get('first_name'),
      reset_url: `${process.env.WEB_HOST}/admin/reset/${token}`
    }
  })

  return {}

}

const resetRoute = new Route({
  action: 'reset',
  activity,
  method: 'patch',
  path: '/reset',
  processor
})

export default resetRoute
