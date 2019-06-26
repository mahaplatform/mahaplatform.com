import '../services/environment'
import  { bootstrapApps,bootstrapType } from './bootstrap'

const bootstrap = async () => {

  await bootstrapApps()

  await bootstrapType('alerts', 'maha_alerts')

  await bootstrapType('notifications', 'maha_notification_types')

  await bootstrapType('rights', 'maha_rights')

}

bootstrap().then(process.exit)
