import Notifications from './notifications'
import Search from './search'
import Help from './help'

const badges = [
  { weight: 10, component: Help },
  { weight: 7, icon: 'bell', sidebar: Notifications, route: '/admin/notifications', channel: '/admin/notifications/unread', sound: '/admin/audio/notification.mp3' },
  { weight: 6, icon: 'search', sidebar: Search, route: '/admin/search' }
]

export default badges
