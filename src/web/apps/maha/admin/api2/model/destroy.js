import { activity } from '../../../../../core/services/routes/activities'
import { refresh } from '../../../../../core/services/routes/emitter'

const destroyRoute = async (req, res) => {

  await refresh(req, {
  })

  await activity(req, {
  })

  res.status(200).respond()

}

export default destroyRoute
