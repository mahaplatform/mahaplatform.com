import NotificationQueue from '../../../../apps/maha/queues/notification_queue'
import NotificationType from '../../../../apps/maha/models/notification_type'
import Notification from '../../../../apps/maha/models/notification'
import { Plugin } from '../../../backframe'
import Story from '../../../../apps/maha/models/story'
import App from '../../../../apps/maha/models/app'
import _ from 'lodash'

const afterCommit = async(req, trx, result, options) => {

  if(!options.notification) return false

  const notificationCreator = options.notification[options.action] || options.notification

  if(!_.isFunction(notificationCreator)) return false

  await options.knex.transaction(async trx => {

    const notifications = await notificationCreator(req, trx, result, options)

    await Promise.mapSeries(_.castArray(notifications), async notification => {

      const story_id = await _findOrCreateStoryId(notification.story, trx)

      const notification_type_id = await _getNotificationType(notification.type, trx)

      await Promise.mapSeries(_.castArray(notification.recipient_ids), async user_id => {

        const notificationObject = await Notification.forge({
          team_id: req.team.get('id'),
          user_id,
          app_id: notification.app_id || req.app ? req.app.get('id') : null,
          subject_id: notification.subject_id,
          story_id,
          notification_type_id,
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
        }).save(null, { transacting: trx })

        NotificationQueue.enqueue(req, trx, notificationObject.get('id'))

      })

    })

  })

}

const _getNotificationType = async (namespaced, trx) => {

  if(!namespaced) return null

  const code = namespaced.split(':')

  if(code.length < 2) return null

  const app = await App.where({
    code: code[0]
  }).fetch({ transacting: trx })

  const type = await NotificationType.where({
    app_id: app ? app.get('id') : null,
    code: code[1]
  }).fetch({ transacting: trx })

  return type ? type.id : null

}

const _findOrCreateStoryId = async (text, trx) => {

  if(!text) return null

  const findStory = await Story.where({ text }).fetch({ transacting: trx })

  const story = findStory || await Story.forge({ text }).save(null, { transacting: trx })

  return story.id

}

const _getObjectProperty = (activity, key, virtualKey) => {
  if(typeof(activity[key]) !== 'undefined') return activity[key]
  if(typeof(activity.object) === 'undefined') return null
  const propertyKey = virtualKey || key
  if(typeof(activity.object[propertyKey]) !== 'undefined') return activity.object[propertyKey]
  return activity.object.get(propertyKey)
}

const notifierPlugin = new Plugin({
  name: 'notifier',
  afterCommit
})

export default notifierPlugin
