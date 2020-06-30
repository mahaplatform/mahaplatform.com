import Story from '../../../apps/maha/models/story'
import Audit from '../../../apps/maha/models/audit'
import _ from 'lodash'

export const audit = async (req, entries) => {

  return await Promise.map(_.castArray(entries), async entry => {

    const auditable = await _getAuditable(entry)

    const story_id = await _findOrCreateStoryId(entry.story, req.trx)

    const subject = _getSubject(req, entry)

    return await Audit.forge({
      ...subject,
      auditable_type: auditable.type,
      auditable_id: auditable.id,
      story_id,
      ...entry.created_at ? { created_at: entry.created_at } : {},
      ...entry.updated_at ? { updated_at: entry.updated_at } : {}
    }).save(null, {
      transacting: req.trx
    })

  })

}

const _getSubject = (req, entry) => {
  if(entry.contact) {
    return {
      team_id: entry.contact.get('team_id'),
      contact_id: entry.contact.get('id')
    }
  }
  if(req.user) {
    return {
      team_id: req.user.get('team_id'),
      user_id: req.user.get('id')
    }
  }
  return {
    team_id: req.team.get('id')
  }
}

const _getAuditable = async (entry) => ({
  type: entry.auditable_type || entry.auditable.tableName,
  id: entry.auditable_id || entry.auditable.id || entry.auditable.get('id')
})

const _findOrCreateStoryId = async (text, trx) => {

  if(!text) return null

  const findStory = await Story.where({ text }).fetch({ transacting: trx })

  const story = findStory || await Story.forge({ text }).save(null, { transacting: trx })

  return story.id

}
