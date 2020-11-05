import socket from '@core/services/routes/emitter'
import { getQueueFiles } from './utils'

const cleanRoute = async (req, res) => {

  const queueFiles = getQueueFiles()

  const { queue } = queueFiles[req.params.name]

  const result = await queue.clean(1000, req.params.status)

  await socket.refresh(req, [
    `/admin/platform/queues/${req.params.status}`
  ])

  res.status(200).respond(result)

}

export default cleanRoute
