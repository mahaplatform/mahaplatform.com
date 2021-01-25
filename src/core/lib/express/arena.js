import Arena from 'bull-arena'
import bull from 'bull'

const arena = Arena({
  Bull: bull,
  queues: ['twilio','analytics','cron','mailer','worker'].map(name => ({
    type: 'bull',
    name,
    hostId: name,
    redis: process.env.REDIS_URL
  }))
}, {
  basePath: '/jobs',
  disableListen: true
})

export default arena
