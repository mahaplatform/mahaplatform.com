import socket from '../../../../../core/services/emitter'

const signoutRoute = async (req, res) => {

  await socket.in(`/admin/sessions/${req.params.id}`).emit('message', {
    action: 'signout'
  })

  res.status(200).respond(true)

}

export default signoutRoute
