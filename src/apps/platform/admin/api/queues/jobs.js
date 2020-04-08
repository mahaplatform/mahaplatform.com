import collectObjects from '../../../../../core/utils/collect_objects'
import moment from 'moment'

const queueFiles = collectObjects('queues/*')

const jobsRoute = async (req, res) => {

  const queueFile = queueFiles.find(queueFile => {
    return queueFile.default.name === req.params.name
  })

  const queue = queueFile.default.queue

  const jobs = await queue.getJobs([req.params.status], 0, 100)

  jobs.pagination = {
    all: jobs.length,
    total: jobs.length,
    skip: 0,
    limit: 100
  }

  res.status(200).respond(jobs, (req, job) => ({
    id: job.id,
    created_at: moment(job.timestamp).format('MM/DD/YY hh:mmA'),
    attempts: job.attemptsMade,
    reason: job.failedReason
  }))

}

export default jobsRoute
