import { Segment } from '../../../../core/backframe'
import access from './access'
import activities from './activities'
import app_settings from './app_settings'
import apps from './apps'
import device_values from './device_values'
import emails from './emails'
import imports from './imports'
import sessions from './sessions'
import settings from './settings'

const api = new Segment({
  routes: [
    access,
    activities,
    app_settings,
    apps,
    device_values,
    emails,
    imports,
    sessions,
    settings
  ]
})

export default api
