import { getQueueFiles } from '../utils'

const destroyRoute = async (req, res) => {

  const queueFiles = getQueueFiles()

  const { queue } = queueFiles[req.params.name]

  const job = await queue.getJob(req.params.id)

  await job.remove()

  await res.status(200).respond(true)

}

export default destroyRoute
