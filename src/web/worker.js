import './maha/core/services/environment'
import collectObjects from './maha/core/utils/collect_objects'
import { info } from './maha/core/utils/console'
import chalk from 'chalk'

const queueFiles = collectObjects('queues/*')

const processor = async () => {

  const output = []

  await Promise.mapSeries(queueFiles, async (queueFile) => {

    const queue = queueFile.default

    output.push(chalk.green('Starting queue: ')+chalk.grey(queue.name))

    queue.start()

  })

  info('WORKER', queueFiles.map(queueFile => `Running ${queueFile.default.name}`))

}

processor()
