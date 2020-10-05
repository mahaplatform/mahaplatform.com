import Notifications from './notifications'
import Attachment from './attachment'
import AssetShow from './assets/show'
import AssetInfo from './assets/info'
import EmailShow from './emails/show'
import Dashboard from './dashboard'
import Gallery from './gallery'
import Search from './search'
import Help from './help'

const routes = [
  { path: '/assets/:id/info', component: AssetInfo },
  { path: '/assets/:id', component: AssetShow },
  { path: '/:attachable_type/:attachable_id/attachments', component: Gallery },
  { path: '/:attachable_type/:attachable_id/attachments/:id', component: Attachment },
  { path: '/dashboard', component: Dashboard },
  { path: '/emails/:code', component: EmailShow },
  { path: '/help', component: Help },
  { path: '/notifications', component: Notifications },
  { path: '/search', component: Search }
]

export default routes
