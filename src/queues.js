import '@core/vendor/sourcemaps'
import '@core/services/environment'
import { startQueues } from '@core/services/queues'

const processor = async () => {

  const args = process.argv.slice(2)

  const queues = args

  await Promise.mapSeries(queues, async(queue) => {
    await startQueues(queue)
  })

}

processor()
