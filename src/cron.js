import './core/services/environment'
import collectObjects from './core/utils/collect_objects'
import sourceMapSupport from 'source-map-support'
import log from './core/utils/log'
import later from 'later'

if(process.env.NODE_ENV === 'production') sourceMapSupport.install()

const cronFiles = collectObjects('cron/*')

cronFiles.map(cronFile => {

  const cron = cronFile.default

  const schedule = later.parse.cron(cron.schedule, true)

  log('info', 'cron', `Starting ${cron.name}`)

  later.setInterval(cron.handler, schedule)

})
