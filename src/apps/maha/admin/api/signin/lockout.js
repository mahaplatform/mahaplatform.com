import { createUserToken } from '../../../../../web/core/utils/user_tokens'
import { validate } from '../../../../../web/core/utils/validation'
import { sendAlert } from '../../../services/alerts'
import User from '../../../models/user'
import moment from 'moment'

const lockoutRoute = async (req, res) => {

  await validate({
    team_id: 'required',
    email: 'required'
  }, req.body)

  const user = await User.where({
    team_id: req.body.team_id,
    email: req.body.email
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(422).json({
    code: 422,
    message: 'Unable to find this user'
  })

  await user.save({
    locked_out_at: moment()
  }, {
    transacting: req.trx
  })

  const token = createUserToken(user, 'reset_id')

  await sendAlert(req, user, 'maha:lockout', {
    first_name: user.get('first_name'),
    reset_url: `${process.env.WEB_HOST}/admin/reset/${token}`
  })

  res.status(200).respond(true)

}

export default lockoutRoute
