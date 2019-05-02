import './maha/core/services/environment'
import collectObjects from './maha/core/utils/collect_objects'
import { info } from './maha/core/utils/console'
import later from 'later'

const cronFiles = collectObjects('cron/*')

const processor = async () => {

  await Promise.mapSeries(cronFiles, async (cronFile) => {

    const cron = cronFile.default

    const schedule = later.parse.cron(cron.schedule, true)

    later.setInterval(cron.handler, schedule)

  })

  info('CRON', cronFiles.map(cronFile => `Running ${cronFile.default.name}`))

}

processor()
