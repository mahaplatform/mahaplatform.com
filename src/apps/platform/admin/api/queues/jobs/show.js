import { getQueueFiles } from '../utils'

const jobRoute = async (req, res) => {

  const queueFiles = getQueueFiles()

  const { name, queue } = queueFiles[req.params.name]

  const job = await queue.getJob(req.params.id)

  res.status(200).respond({
    ...job,
    queue: name
  })

}

export default jobRoute
