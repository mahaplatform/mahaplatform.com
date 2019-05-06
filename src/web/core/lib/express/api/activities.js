import Activity from '../../../../apps/maha/models/activity'
import { Plugin } from '../../../backframe'
import Story from '../../../../apps/maha/models/story'
import socket from '../../../services/emitter'

const afterProcessor = async (req, trx, result, options) => {

  if(!options.activity) return

  const activity = await options.activity(req, trx, result, options)

  const story_id = await _findOrCreateStoryId(activity.story)

  await Activity.forge({
    team_id: req.user.get('team_id'),
    user_id: req.user.get('id'),
    app_id: req.app ? req.app.get('id') : null,
    story_id,
    object_owner_id: _getObjectProperty(activity, 'object_owner_id'),
    object_table: _getObjectProperty(activity, 'object_table', 'tableName'),
    object_text: _getObjectProperty(activity, 'object_text'),
    object_type: _getObjectProperty(activity, 'object_type'),
    object_id: _getObjectProperty(activity, 'object_id', 'id'),
    url: _getObjectProperty(activity, 'object_url')
  }).save(null, { transacting: trx })

  await socket.in('/admin/team/activities').emit('message', {
    target: '/admin/team/activities',
    action: 'refresh',
    data: null
  })

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

const activitiesPlugin = new Plugin({
  name: 'activities',
  afterProcessor
})

export default activitiesPlugin
