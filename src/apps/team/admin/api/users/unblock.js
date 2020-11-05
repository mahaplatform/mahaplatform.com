import { activity } from '@core/services/routes/activities'
import socket from '@core/services/routes/emitter'
import User from '@apps/maha/models/user'

const unblockRoute = async (req, res) => {

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

  await user.save({
    is_blocked: false
  }, {
    patch: true,
    transacting: req.trx
  })

  await activity(req, {
    story: 'unblocked {object}',
    object: user
  })

  await socket.refresh(req, [
    '/admin/team/users',
    `/admin/team/users/${user.get('id')}`
  ])

  res.status(200).respond(true)

}

export default unblockRoute
