import socket from '../../../core/services/routes/emitter'
import Story from '../../maha/models/story'
import Activity from '../models/activity'

export const contactActivity = async (req, { user, contact, type, story, object, data }) => {

  await Activity.forge({
    team_id: req.team.get('id'),
    user_id: user ? user.get('id') : null,
    contact_id: contact.get('id'),
    type,
    story_id: await _findOrCreateStoryId(req, story),
    ...object ? { [`${type}_id`]: object.get('id') } : {},
    ...data ? { data } : {}
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, [
    `/admin/crm/contacts/${contact.get('id')}/activities`
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
