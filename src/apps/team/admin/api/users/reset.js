import { activity } from '../../../../../core/services/routes/activities'
import { createUserToken } from '../../../../../core/utils/user_tokens'
import mailer from '../../../../maha/queues/mailer_queue'
import User from '../../../../maha/models/user'

const resetRoute = async (req, res) => {

  const user = await User.scope({
    team: req.team
  }).query(qb => {
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!user) return res.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  const token = createUserToken(user, 'reset_id')

  await mailer.enqueue(req, {
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
    object_owner_id: req.resource.get('id'),
    object_text: 'password'
  })

  res.status(200).respond(true)

}

export default resetRoute
