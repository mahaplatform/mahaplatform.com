import './core/services/environment'
import collectObjects from './core/utils/collect_objects'
import sourceMapSupport from 'source-map-support'
import log from './core/utils/log'

if(process.env.NODE_ENV === 'production') sourceMapSupport.install()

const queueFiles = collectObjects('queues/*')

queueFiles.map(queueFile => {

  const queue = queueFile.default

  log('info', 'worker', `Starting ${queue.name}`)

  queue.start()

})
