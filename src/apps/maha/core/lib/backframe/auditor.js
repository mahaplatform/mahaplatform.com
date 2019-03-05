import { Plugin } from '../../packages/backframe'
import Story from '../../../models/story'
import Audit from '../../../models/audit'
import _ from 'lodash'

const afterProcessor = async (req, trx, result, options) => {

  if(!options.audit) return

  if(options.action === 'destroy') return null

  const entries = await options.audit(req, trx, result, options)

  await Promise.map(_coerceArray(entries), async entry => {

    const auditable = await _getAuditable(entry)

    const story_id = await _findOrCreateStoryId(entry.story, trx)

    await Audit.forge({
      team_id: req.user.get('team_id'),
      user_id: req.user.get('id'),
      auditable_type: auditable.type,
      auditable_id: auditable.id,
      story_id
    }).save(null, { transacting: trx })

  })

}

const _getAuditable = async (entry) => ({
  type: entry.auditable.tableName,
  id: entry.auditable.id || entry.auditable.get('id')
})

const _findOrCreateStoryId = async (text, trx) => {

  if(!text) return null

  const findStory = await Story.where({ text }).fetch({ transacting: trx })

  const story = findStory || await Story.forge({ text }).save(null, { transacting: trx })

  return story.id

}

const _coerceArray = value => !_.isArray(value) ? [value] : value

const auditorPlugin = new Plugin({
  name: 'auditor',
  afterProcessor
})

export default auditorPlugin
