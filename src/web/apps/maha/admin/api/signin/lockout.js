import { createUserToken } from '../../../../../core/utils/user_tokens'
import { BackframeError, Route } from '../../../../../core/backframe'
import User from '../../../models/user'
import { sendAlert } from '../../../services/alerts'
import moment from 'moment'

const processor = async (req, trx, options) => {

  const user = await User.where({
    team_id: req.body.team_id,
    email: req.body.email
  }).fetch({ transacting: trx })

  if(!user) throw new BackframeError({ code: 422, message: 'Unable to find this user'})

  await user.save({
    locked_out_at: moment()
  }, { transacting: trx })

  const token = createUserToken(user, 'reset_id')

  await sendAlert(req, trx, user, 'maha:lockout', {
    first_name: user.get('first_name'),
    reset_url: `${process.env.WEB_HOST}/admin/reset/${token}`
  })

  return true

}

const rules = {
  team_id: 'required',
  email: 'required'
}

const passwordRoute = new Route({
  path: '/lockout',
  method: 'post',
  processor,
  rules
})

export default passwordRoute
