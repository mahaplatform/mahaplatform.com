import Redis from 'ioredis'
import Queue from 'bull'

const server = (router) => {

  const redis = new Redis(process.env.REDIS_URL)

  let queues = null

  const getQueues = async () => {

    if(queues) return queues

    const queueKeys = await redis.keys('bull:*:stalled-check')

    queues = queueKeys.reduce((queues, key) => {
      const [,name] = key.match(/bull:(.*):stalled-check/)
      return {
        ...queues,
        [name]: new Queue(name, process.env.REDIS_URL)
      }
    }, {})

    return queues

  }

  router.get('/queues/:key/clean', async (req, res) => {

    const queues = await getQueues()

    const result = await queues[req.params.key].clean(1000)

    res.send(result)

  })

  router.use('/queues/:key/jobs/:id/retry', async (req, res) => {

    const queues = await getQueues()

    const job = await queues[req.params.key].getJob(req.params.id)

    const result = await job.retry()

    res.send(result)

  })

  router.get('/queues/:key/jobs/:id/remove', async (req, res) => {

    const queues = await getQueues()

    const job = await queues[req.params.key].getJob(req.params.id)

    const result = await job.remove()

    res.send(result)

  })

  router.use('/queues/:key/jobs/:id', async (req, res) => {

    const queues = await getQueues()

    const result = await queues[req.params.key].getJob(req.params.id)

    res.send(result)

  })

  router.get('/queues/:key/jobs', async (req, res) => {

    const queues = await getQueues()

    const result = await queues[req.params.key].getJobs([req.query.type])

    res.send(result)

  })

  router.get('/queues/:key/counts', async (req, res) => {

    const queues = await getQueues()

    const result = await queues[req.params.key].getJobCounts()

    res.send(result)

  })

  router.get('/queues/:key/add', async (req, res) => {

    const queues = await getQueues()

    const result = await queues[req.params.key].add({ foo: 'bar' })

    res.send(result)

  })

  router.get('/queues', async (req, res) => {

    const queues = await getQueues()

    const result = await Promise.reduce(Object.keys(queues), async (result, key) => ({
      ...result,
      [key]: await queues[key].getJobCounts()
    }), {})

    res.send(result)

  })

  return router

}

export default server
