import './core/services/environment'
import collectObjects from './core/utils/collect_objects'
import log from './core/utils/log'
import later from 'later'

const cronFiles = collectObjects('cron/*')

const processor = async () => {

  await Promise.mapSeries(cronFiles, async (cronFile) => {

    const cron = cronFile.default

    const schedule = later.parse.cron(cron.schedule, true)

    log('info', 'cron', `Starting ${cron.name}`)

    later.setInterval(cron.handler, schedule)

  })

}

processor()
