import Notifications from './notifications'
import AssetShow from './assets/show'
import AssetInfo from './assets/info'
import Gallery from './gallery'
import Search from './search'
import Help from './help'

const routes = [
  { path: '/assets/:id/info', component: AssetInfo },
  { path: '/assets/:id', component: AssetShow },
  { path: '/attachments/:attachable_type/:attachable_id', component: Gallery },
  { path: '/help', component: Help },
  { path: '/notifications', component: Notifications },
  { path: '/search', component: Search }
]

export default routes
