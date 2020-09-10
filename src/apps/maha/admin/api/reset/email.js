import { activity } from '../../../../../core/services/routes/activities'
import { createUserToken } from '../../../../../core/utils/user_tokens'
import { validate } from '../../../../../core/utils/validation'
import { sendEmail } from '../../../services/emails'
import User from '../../../models/user'

const emailRoute = async (req, res, next) => {

  await validate({
    team_id: 'required',
    email: 'required'
  }, req.body)

  req.user = await User.where({
    team_id: req.body.team_id,
    email: req.body.email
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = req.user.related('team')

  const token = createUserToken(req.user, 'reset_id')

  await sendEmail(req, {
    team_id: req.body.team_id,
    user: req.user,
    template: 'team:reset',
    data: {
      first_name: req.user.get('first_name'),
      reset_url: `${process.env.WEB_HOST}/admin/reset/${token}`
    }
  })

  await activity(req, {
    story: 'requested {object}',
    object: req.user,
    object_owner_id: req.user.get('id'),
    object_text: 'password reset',
    object_type: null
  })

  res.status(200).respond(true)

}

export default emailRoute
