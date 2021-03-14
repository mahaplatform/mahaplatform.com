import analytics from '@core/entities/analytics'
import collector from '@core/entities/collector'
import twilio from '@core/entities/twilio'
import worker from '@core/entities/worker'
import server from '@core/entities/server'
import cron from '@core/entities/cron'
import web from '@core/entities/web'
import arg from 'arg'

const start = async (argv) => {

  const args = arg({}, {
    argv
  })

  if(args._[0] === 'analytics') await analytics()
  if(args._[0] === 'collector') await collector()
  if(args._[0] === 'cron') await cron()
  if(args._[0] === 'server') await server()
  if(args._[0] === 'twilio') await twilio()
  if(args._[0] === 'worker') await worker()
  if(args._[0] === 'web') await web()

}

export default start
