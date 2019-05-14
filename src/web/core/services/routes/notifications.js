import NotificationQueue from '../../../apps/maha/queues/notification_queue'
import NotificationType from '../../../apps/maha/models/notification_type'
import Notification from '../../../apps/maha/models/notification'
import Listening from '../../../apps/maha/models/listening'
import Story from '../../../apps/maha/models/story'
import App from '../../../apps/maha/models/app'
import _ from 'lodash'

export const notifications = async (req, notifications) => {

  await Promise.mapSeries(_.castArray(notifications), async notification => {

    const recipient_ids = await _getRecipientIds(req, notification)

    await Promise.mapSeries(recipient_ids, async user_id => {

      const notificationObject = await Notification.forge({
        team_id: req.team.get('id'),
        user_id,
        app_id: notification.app_id || req.app ? req.app.get('id') : null,
        subject_id: notification.subject_id,
        story_id: await _findOrCreateStoryId(req, notification.story),
        notification_type_id: await _getNotificationType(req, notification.type),
        code: _.random(100000000, 999999999).toString(36),
        object_owner_id: _getObjectProperty(notification, 'object_owner_id'),
        object_table: _getObjectProperty(notification, 'object_table', 'tableName'),
        object_text: _getObjectProperty(notification, 'object_text'),
        object_type: _getObjectProperty(notification, 'object_type'),
        object_id: _getObjectProperty(notification, 'object_id', 'id'),
        url: _getObjectProperty(notification, 'object_url'),
        is_delivered: false,
        is_seen: false,
        is_visited: false
      }).save(null, {
        transacting: req.trx
      })

      NotificationQueue.enqueue(req, req.trx, notificationObject.get('id'))

    })

  })

}

const _getRecipientIds = async (req, notification) => [
  ..._.castArray(notification.recipient_ids || []),
  ...await _getListenerIds(req, notification)
]

const _getListenerIds = async (req, notification) => {

  if(!notification.listenable_type) return []

  return await Listening.where({
    listenable_type: notification.listenable_type,
    listenable_id: notification.listenable_id
  }).fetchAll({
    transacting: req.trx
  }).then(listenings => listenings.filter(listener => {
    return listener.get('user_id') !== req.user.get('id')
  })).then(listenings => listenings.map(listener => {
    return listener.get('user_id')
  }))

}

const _getNotificationType = async (req, namespaced) => {

  if(!namespaced) return null

  const code = namespaced.split(':')

  if(code.length < 2) return null

  const app = await App.where({
    code: code[0]
  }).fetch({
    transacting: req.trx
  })

  const type = await NotificationType.where({
    app_id: app ? app.get('id') : null,
    code: code[1]
  }).fetch({
    transacting: req.trx
  })

  return type ? type.id : null

}

const _findOrCreateStoryId = async (req, text) => {

  if(!text) return null

  const story = await Story.fetchOrCreate({
    text
  }, {
    transacting: req.trx
  })

  return story.get('id')

}

const _getObjectProperty = (activity, key, virtualKey) => {
  if(typeof(activity[key]) !== 'undefined') return activity[key]
  if(typeof(activity.object) === 'undefined') return null
  const propertyKey = virtualKey || key
  if(typeof(activity.object[propertyKey]) !== 'undefined') return activity.object[propertyKey]
  return activity.object.get(propertyKey)
}
