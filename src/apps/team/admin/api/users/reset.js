import { activity } from '../../../../../core/services/routes/activities'
import { createUserToken } from '../../../../../core/utils/user_tokens'
import { sendEmail } from '../../../../maha/services/emails'
import User from '../../../../maha/models/user'

const resetRoute = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  const token = createUserToken(user, 'reset_id')

  await sendEmail(req, {
    team_id: req.team.get('id'),
    user,
    template: 'team:reset',
    data: {
      first_name: user.get('first_name'),
      reset_url: `${process.env.WEB_HOST}/admin/reset/${token}`
    }
  })

  await activity(req, {
    story: 'reset {object}',
    object_owner_id: user.get('id'),
    object_text: 'password'
  })

  res.status(200).respond(true)

}

export default resetRoute
