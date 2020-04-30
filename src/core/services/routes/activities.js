import Activity from '../../../apps/maha/models/activity'
import Story from '../../../apps/maha/models/story'
import socket from './emitter'

export const activity = async (req, activity) => {

  await Activity.forge({
    team_id: req.user.get('team_id'),
    user_id: req.user.get('id'),
    app_id: req.app ? req.app.get('id') : null,
    story_id: await _findOrCreateStoryId(req, activity.story),
    object_owner_id: _getObjectProperty(activity, 'object_owner_id'),
    object_table: _getObjectProperty(activity, 'object_table', 'tableName'),
    object_text: _getObjectProperty(activity, 'object_text'),
    object_type: _getObjectProperty(activity, 'object_type'),
    object_id: _getObjectProperty(activity, 'object_id', 'id'),
    url: _getObjectProperty(activity, 'object_url'),
    ...activity.created_at ? { created_at: activity.created_at } : {},
    ...activity.updated_at ? { updated_at: activity.updated_at } : {}
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    '/admin/team/activities'
  ])

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
