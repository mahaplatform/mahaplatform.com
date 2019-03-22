import socket from '../../../core/services/emitter'
import { Route } from '../../../server'

const processor = async (req, trx, options) => {

  await socket.in(`/admin/sessions/${req.params.id}`).emit('message', {
    action: 'signout'
  })

  return true

}

const signoutRoute = new Route({
  method: 'post',
  path: '/signout',
  processor
})

export default signoutRoute
