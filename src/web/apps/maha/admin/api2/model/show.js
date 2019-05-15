import { activity } from '../../../../../core/services/routes/activities'
import socket from '../../../../../core/services/routes/emitter'

const showRoute = async (req, res) => {

  await socket.refresh(req, {
  })

  await activity(req, {
  })

  res.status(200).respond()

}

export default showRoute
