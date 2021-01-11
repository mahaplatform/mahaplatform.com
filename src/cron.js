import './core/vendor/sourcemaps'
import './core/services/environment'
import collectObjects from './core/utils/collect_objects'
import log from './core/utils/log'
import later from 'later'

const cronFiles = collectObjects('cron/*_cron.js')

const getSchedule = ({ cron, text, time }) => {
  if(cron) return later.parse.cron(cron, true)
  if(text) return later.parse.text(text, true)
  if(time) return later.parse.text(`at ${time}`, true)
}

cronFiles.map(cronFile => {

  const cron = cronFile.default

  const schedule = getSchedule(cron)

  log('info', 'cron', `Starting ${cron.name}`)

  later.setInterval(cron.handler, schedule)

})
