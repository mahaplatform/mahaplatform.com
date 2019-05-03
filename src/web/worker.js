import './core/services/environment'
import collectObjects from './core/utils/collect_objects'
import log from './core/utils/log'

const queueFiles = collectObjects('queues/*')

const processor = async () => {

  await Promise.mapSeries(queueFiles, async (queueFile) => {

    const queue = queueFile.default

    log('info', 'cron', `Starting ${queue.name}`)

    queue.start()

  })

}

processor()
