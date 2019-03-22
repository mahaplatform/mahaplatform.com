import collectObjects from '../../core/utils/collect_objects'
import { info } from '../utils/console'
import later from 'later'

const cronFiles = collectObjects('cron/*')

export default async () => {

  await Promise.mapSeries(cronFiles, async (cronFile) => {

    const cron = cronFile.default

    const schedule = later.parse.cron(cron.schedule, true)

    later.setInterval(cron.handler, schedule)

  })

  info('CRON', cronFiles.map(cronFile => `Running ${cronFile.default.name}`))

}
