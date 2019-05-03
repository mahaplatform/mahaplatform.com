import socket from '../../../../../core/services/emitter'
import Session from '../../../models/session'
import { Route } from '../../../../../core/backframe'

const processor = async (req, trx, options) => {

  const session = await Session.where({
    id: req.params.id
  }).fetch({ transacting: trx })

  const id = session.get('id')

  const user_id = session.get('user_id')

  await session.destroy({ transacting: trx })

  await socket.in(`/admin/users/${user_id}`).emit('message', {
    action: 'session'
  })

  await socket.in(`/admin/sessions/${id}`).emit('message', {
    action: 'signout'
  })

}

const removeRoute = new Route({
  method: 'post',
  path: '/remove',
  processor
})

export default removeRoute
