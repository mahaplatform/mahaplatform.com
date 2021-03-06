import { activity } from '@core/services/routes/activities'
import { createUser, sendActivation } from '@apps/team/services/users'
import UserSerializer from '@apps/team/serializers/user_serializer'
import socket from '@core/services/routes/emitter'

const createRoute = async (req, res) => {

  const user = await createUser(req, {
    team_id: req.team.get('id'),
    ...req.body
  })

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

  await res.status(200).respond(user, UserSerializer)

}

export default createRoute
