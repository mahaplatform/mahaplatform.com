import socket from '@core/services/routes/emitter'
import { getQueueFiles } from '../utils'

const retryRoute = async (req, res) => {

  const queueFiles = getQueueFiles()

  const { queue } = queueFiles[req.params.name]

  const job = await queue.getJob(req.params.id)

  const result = await job.retry()

  await socket.refresh(req, [
    `/admin/platform/queues/${req.params.name}/jobs/${req.params.id}`
  ])

  await res.status(200).respond(result)

}

export default retryRoute
