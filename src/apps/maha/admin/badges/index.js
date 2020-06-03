import Notifications from './notifications'
import Search from './search'
import Help from './help'

const badges = [
  { component: Help },
  { icon: 'bell', sidebar: Notifications, route: '/admin/notifications', channel: '/admin/notifications/unread', sound: '/admin/audio/notification.mp3' },
  { icon: 'search', sidebar: Search, route: '/admin/search' }
]

export default badges
