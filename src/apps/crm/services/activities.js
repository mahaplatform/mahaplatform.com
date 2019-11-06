import socket from '../../../core/services/routes/emitter'
import Story from '../../maha/models/story'
import Activity from '../models/activity'

export const contactActivity = async (req, { foreign_key, team_id, user, contact, program_id, type, story, object, data }) => {

  await Activity.forge({
    team_id: team_id || req.team.get('id'),
    user_id: user ? user.get('id') : null,
    contact_id: contact.get('id'),
    type,
    program_id,
    story_id: await _findOrCreateStoryId(req, story),
    ...object && foreign_key ? { [foreign_key]: object.get('id') } : {},
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
