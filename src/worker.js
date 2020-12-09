import './core/vendor/sourcemaps'
import './core/services/environment'
import collectObjects from './core/utils/collect_objects'
import log from './core/utils/log'

const queueFiles = collectObjects('queues/*_queue.js')

queueFiles.map(queueFile => {

  const queue = queueFile.default

  log('info', 'worker', `Starting ${queue.name}`)

  queue.start()

})
