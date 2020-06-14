import '../core/services/environment'
import { bootstrapApps, bootstrapType } from '../core/scripts/bootstrap/bootstrap'
import register from 'babel-register'
import fs from 'fs'

const babelrc = JSON.parse(fs.readFileSync('.babelrc'))

register(babelrc)

const processor = async () => {

  await bootstrapApps()

  await bootstrapType('alerts', 'alerts', 'maha_alerts')

  await bootstrapType('notifications', 'notifications', 'maha_notification_types')

  await bootstrapType('rights', 'rights', 'maha_rights')

  await bootstrapType('dashboard', 'dashboard/index', 'maha_dashboard_card_types')

}

processor().then(process.exit)
