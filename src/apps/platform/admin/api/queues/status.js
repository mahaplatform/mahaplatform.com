import { getQueueFiles } from './utils'
import moment from 'moment'

const statusRoute = async (req, res) => {

  const queueFiles = getQueueFiles()

  const { queue } = queueFiles[req.params.name]

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

export default statusRoute
