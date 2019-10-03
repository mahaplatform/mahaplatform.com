import collectObjects from '../../utils/collect_objects'
import Arena from 'bull-arena'
import path from 'path'

const queues = collectObjects('queues/*')

const arena = Arena({
  queues: queues.map(queue => ({
    name: path.basename(queue.filepath).replace('_queue.js', ''),
    hostId: 'worker',
    redis: process.env.REDIS_URL
  }))
}, {
  basePath: '/jobs',
  disableListen: true
})

export default arena
