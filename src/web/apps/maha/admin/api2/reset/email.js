import { activity } from '../../../../../core/services/routes/activities'
import { createUserToken } from '../../../../../core/utils/user_tokens'
import mailer from '../../../queues/mailer_queue'
import User from '../../../models/user'
import Checkit from 'checkit'

const emailRoute = async (req, res, next) => {

  await Checkit({
    team_id: 'required',
    email: 'required'
  }).run(req.body)

  req.user = await User.where({
    team_id: req.body.team_id,
    email: req.body.email
  }).fetch({
    withRelated: ['team'],
    transacting: req.trx
  })

  req.team = req.user.related('team')

  const token = createUserToken(req.user, 'reset_id')

  await mailer.enqueue(req, req.trx, {
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
