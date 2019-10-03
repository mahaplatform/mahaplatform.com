import { activity } from '../../../../../web/core/services/routes/activities'
import { sendUserActivation } from '../../../services/users'
import User from '../../../../maha/models/user'

const activateRoute = async (req, res) => {

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

  await sendUserActivation(req, user)

  await activity(req, {
    story: 'resent an activation email to {object}',
    object: user
  })

  res.status(200).respond(true)

}

export default activateRoute
