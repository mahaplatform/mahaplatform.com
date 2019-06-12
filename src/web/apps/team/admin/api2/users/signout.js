import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'
import User from '../../../../maha/models/user'
import moment from 'moment'

const signoutRoute = async (req, res) => {

  const user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('id', req.params.id)
  }).fetch({
    transacting: req.trx
  })

  if(!user) return req.status(404).respond({
    code: 404,
    message: 'Unable to load user'
  })

  await user.save({
    invalidated_at: moment()
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'signed {object} out of all devices',
    object: user
  })

  await socket.message(req, {
    channel: `/admin/users/${user.get('id')}`,
    action: 'signout'
  })

  res.status(200).respond(true)

}

export default signoutRoute
