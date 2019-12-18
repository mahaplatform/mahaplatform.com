import Story from '../../../apps/maha/models/story'
import Audit from '../../../apps/maha/models/audit'
import _ from 'lodash'

export const audit = async (req, entries) => {

  await Promise.map(_.castArray(entries), async entry => {

    const auditable = await _getAuditable(entry)

    const story_id = await _findOrCreateStoryId(entry.story, req.trx)

    const subject = _getSubject(req, entry)

    await Audit.forge({
      ...subject,
      auditable_type: auditable.type,
      auditable_id: auditable.id,
      story_id
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
  return {
    team_id: req.user.get('team_id'),
    user_id: req.user.get('id')
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
