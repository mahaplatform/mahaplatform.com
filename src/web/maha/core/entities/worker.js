import collectObjects from '../../core/utils/collect_objects'
import { info } from '../utils/console'
import chalk from 'chalk'

const queueFiles = collectObjects('queues/*')

const worker = async () => {

  const output = []

  await Promise.mapSeries(queueFiles, async (queueFile) => {

    const queue = queueFile.default

    output.push(chalk.green('Starting queue: ')+chalk.grey(queue.name))

    queue.start()

  })

  info('WORKER', queueFiles.map(queueFile => `Running ${queueFile.default.name}`))

}

export default worker
