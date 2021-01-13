import collectObjects from '@core/utils/collect_objects'
import log from '@core/utils/log'

const queues = [
  ...collectObjects('queues/*_queue.js'),
  ...collectObjects('cron/*_cron.js')
]

const getQueues = (name) => {
  return queues.map(queueFile => {
    return queueFile.default
  }).filter(queue => {
    return queue.queueName === name
  })
}

export const startQueues = (name) => {
  getQueues(name).map(queue => {
    log('info', name, `Starting ${queue.name}`)
    queue.start()
  })
}
