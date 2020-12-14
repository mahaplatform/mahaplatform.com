import collectObjects from '../../utils/collect_objects'
import Arena from 'bull-arena'
import path from 'path'
import bull from 'bull'

const queues = collectObjects('queues/*_queue.js')

const arena = Arena({
  Bull: bull,
  queues: [
    ...queues.map(queue => ({
      type: 'bull',
      name: path.basename(queue.filepath).replace('_queue.js', ''),
      hostId: 'worker',
      redis: process.env.REDIS_URL
    }))
  ]
}, {
  basePath: '/jobs',
  disableListen: true
})

export default arena
