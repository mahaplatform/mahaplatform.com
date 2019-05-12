import socket from '../../../../../core/services/emitter'
import Session from '../../../models/session'

const removeRoute = async (req, res) => {

  const session = await Session.where({
    id: req.params.id
  }).fetch({
    transacting: req.trx
  })

  await session.destroy({
    transacting: req.trx
  })

  await socket.in(`/admin/users/${session.get('user_id')}`).emit('message', {
    action: 'session'
  })

  await socket.in(`/admin/sessions/${session.get('id')}`).emit('message', {
    action: 'signout'
  })

  res.status(200).respond(true)

}

export default removeRoute
