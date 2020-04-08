import collectObjects from '../../../../../core/utils/collect_objects'

const queueFiles = collectObjects('queues/*')

const listRoute = async (req, res) => {

  const queues = await Promise.map(queueFiles, async queueFile => {
    const queueObject = queueFile.default
    const jobs = await queueObject.queue.getJobCounts()
    return {
      name: queueObject.name,
      ...jobs
    }
  })

  const sort = req.query.$sort

  const sorted = sort ? queues.sort((a,b) => {
    const direction = sort[0] === '-' ? 1 : -1
    const field = sort.replace('-','')
    const avalue = field === 'name' ? a[field] : parseInt(a[field])
    const bvalue = field === 'name' ? b[field] : parseInt(b[field])
    return avalue < bvalue ? direction : -1 * direction
  }) : queues

  sorted.pagination = {
    all: queues.length,
    total: queues.length,
    skip: 0,
    limit: 100
  }

  res.status(200).respond(sorted)

}

export default listRoute
