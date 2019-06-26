import '../web/core/services/environment'
import { bootstrapApps, bootstrapType } from '../web/core/scripts/bootstrap/bootstrap'
import register from 'babel-register'
import fs from 'fs'

const babelrc = JSON.parse(fs.readFileSync('.babelrc'))

register(babelrc)

const processor = async () => {

  await bootstrapApps()

  await bootstrapType('alerts', 'maha_alerts')

  await bootstrapType('notifications', 'maha_notification_types')

  await bootstrapType('rights', 'maha_rights')

}

processor().then(process.exit)
