import socket from '@core/services/routes/emitter'

const signoutRoute = async (req, res) => {

  await socket.message(req, {
    channel: `/admin/sessions/${req.params.id}`,
    action: 'signout'
  })

  await res.status(200).respond(true)

}

export default signoutRoute
