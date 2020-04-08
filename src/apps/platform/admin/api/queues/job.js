import collectObjects from '../../../../../core/utils/collect_objects'

const queueFiles = collectObjects('queues/*')

const jobRoute = async (req, res) => {

  const queueFile = queueFiles.find(queueFile => {
    return queueFile.default.name === req.params.name
  })

  const queue = queueFile.default.queue

  const job = await queue.getJob(req.params.id)

  res.status(200).respond(job)

}

export default jobRoute
