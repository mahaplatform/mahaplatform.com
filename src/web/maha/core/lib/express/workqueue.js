import Workqueue from 'maha-workqueue'

const workqueueMiddleware = Workqueue({
  redis: process.env.REDIS_URL
})

export default workqueueMiddleware
