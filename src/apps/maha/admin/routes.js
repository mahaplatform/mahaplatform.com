import Notifications from './views/notifications'
import Help from './views/help'
import AssetShow from './views/assets/show'
import AssetInfo from './views/assets/info'
import Gallery from './views/gallery'
import Search from './views/search'
import { Routes } from 'maha-admin'

const routes = new Routes([
  { path: '/assets/:id/info', component: AssetInfo },
  { path: '/assets/:id', component: AssetShow },
  { path: '/attachments/:attachable_type/:attachable_id', component: Gallery },
  { path: '/help', component: Help },
  { path: '/notifications', component: Notifications },
  { path: '/search', component: Search }
])

export default routes
