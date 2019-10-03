import { activity } from '../../../../../web/core/services/routes/activities'
import socket from '../../../../../web/core/services/routes/emitter'
import User from '../../../../maha/models/user'

const unblockRoute = async (req, res) => {

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
