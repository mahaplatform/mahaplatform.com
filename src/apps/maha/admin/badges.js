import Notifications from './badges/notifications'
import Search from './badges/search'

const badges = [
  { icon: 'bell', sidebar: Notifications, route: '/admin/notifications', channel: '/admin/notifications/unread', sound: '/admin/audio/notification.mp3' },
  { icon: 'search', sidebar: Search, route: '/admin/search' }
]

export default badges
