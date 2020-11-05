import { createUser, sendActivation } from '../../../../team/services/users'
import UserSerializer from '../../../../team/serializers/user_serializer'
import socket from '@core/services/routes/emitter'

const usersRoute = async (req, res) => {

  const user = await createUser(req, {
    team_id: req.params.id,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    role_ids: req.body.role_ids
  })

  await sendActivation(req, {
    user
  })

  await socket.refresh(req, [
    '/admin/platform/teams'
  ])

  res.status(200).respond(user, UserSerializer)

}

export default usersRoute
