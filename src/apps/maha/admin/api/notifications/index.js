import { socket, Resources } from '../../../server'
import Notification from '../../../models/notification'
import NotificationSerializer from '../../../serializers/notification_serializer'
import seen from './seen'
import visited from './visited'
import unread from './unread'

const afterListProcessor = async (req, trx, result, options) => {

  const user_id = req.user.get('id')

  await options.knex('maha_notifications').transacting(trx).where({ user_id }).update({ is_seen: true })

  await socket.emit('/notifications/unread').emit('message', {
    channel: '/admin/notifications/unread',
    action: 'refresh',
    data: null
  })

}

const notificationResources = new Resources({
  afterProcessor: {
    list: afterListProcessor
  },
  collectionActions: [
    seen,
    unread
  ],
  defaultSort: '-created_at',
  memberActions: [
    visited
  ],
  model: Notification,
  only: ['list'],
  ownedByUser: true,
  path: '/notifications',
  serializer: NotificationSerializer,
  sortParams: ['created_at'],
  withRelated: ['subject.photo','app','story','object_owner','user']
})


export default notificationResources
