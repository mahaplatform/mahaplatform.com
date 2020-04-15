import { activity } from '../../../../../core/services/routes/activities'
import { createUser, sendActivation } from '../../../services/users'
import UserSerializer from '../../../serializers/user_serializer'
import socket from '../../../../../core/services/routes/emitter'

const createRoute = async (req, res) => {

  const user = await createUser(req, req.body)

  await sendActivation(req, {
    user
  })

  await activity(req, {
    story: 'created {object}',
    object: user
  })

  await socket.refresh(req, [
    '/admin/team/users'
  ])

  res.status(200).respond(user, UserSerializer)

}

export default createRoute
