import { activity } from '@core/services/routes/activities'
import { sendActivation } from '@apps/team/services/users'
import User from '@apps/maha/models/user'

const activateRoute = async (req, res) => {

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

  await sendActivation(req, {
    user
  })

  await activity(req, {
    story: 'resent an activation email to {object}',
    object: user
  })

  await res.status(200).respond(true)

}

export default activateRoute
