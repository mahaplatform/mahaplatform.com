import { message } from '../../../../../core/services/routes/emitter'

const signoutRoute = async (req, res) => {

  await message(req, {
    channel: `/admin/sessions/${req.params.id}`,
    action: 'signout'
  })

  res.status(200).respond(true)

}

export default signoutRoute
