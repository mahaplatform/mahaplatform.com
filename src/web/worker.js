import './core/services/environment'
import collectObjects from './core/utils/collect_objects'
import log from './core/utils/log'

const queueFiles = collectObjects('queues/*')

queueFiles.map(queueFile => {

  const queue = queueFile.default

  log('info', 'worker', `Starting ${queue.name}`)

  queue.start()

})
