import Notifications from './notifications'
import Search from './search'
import Help from './help'

const badges = [
  { weight: 10, component: Help, tooltip: 'Help Center' },
  { weight: 7, icon: 'bell', sidebar: Notifications, route: '/admin/notifications', channel: '/admin/notifications/unread', sound: '/admin/audio/notification.mp3', tooltip: 'Notifications' },
  { weight: 6, icon: 'search', sidebar: Search, route: '/admin/search', tooltip: 'Search' }
]

export default badges
