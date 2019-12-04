import generateCode from '../../../../core/utils/generate_code'
import { createAsset } from '../../../maha/services/assets'
import socket from '../../../../core/services/emitter'
import Reimbursement from '../../models/reimbursement'
import Source from '../../../maha/models/source'
import Story from '../../../maha/models/story'
import Audit from '../../../maha/models/audit'
import Expense from '../../models/expense'
import Receipt from '../../models/receipt'
import Check from '../../models/check'
import pluralize from 'pluralize'
import moment from 'moment'

const EMAIL_REGEX = /^(expenses|reimbursements|checks)@mahaplatform.com$/

const receiver = async (req, { to, message }) => ({
  type: to.match(EMAIL_REGEX)[1]
})

const processor = async (req, { meta, message }) => {

  const model = _getModel(meta.type)

  const foreign_key = `${pluralize.singular(meta.type)}_id`

  const date = meta.type === 'checks' ? 'date_needed' : 'date'

  const code = await generateCode(req, {
    table: `finance_${meta.type}`
  })

  const item = await model.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    status: 'incomplete',
    [date]: moment(),
    code,
    description: message.subject
  }).save(null, {
    transacting: req.trx
  })

  const file_name = message.subject.replace(/[^0-9a-zA-Z-.]/img, '-').replace(/-{2,}/g, '-').toLowerCase()

  const source = await Source.where({
    text: 'email'
  }).fetch({
    transacting: req.trx
  })

  const asset = await createAsset(req, {
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    source_id: source.get('id'),
    file_name: `${file_name}.html`,
    content_type: 'text/html',
    file_data: message.html || message.textAsHtml
  })

  await Receipt.forge({
    team_id: req.team.get('id'),
    [foreign_key]: item.get('id'),
    delta: 0,
    asset_id: asset.get('id')
  }).save(null, {
    transacting: req.trx
  })

  await Promise.mapSeries(message.attachments, async (attachment, index) => {

    const asset = await createAsset(req, {
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      source_id: source.get('id'),
      file_name: attachment.filename,
      content_type: attachment.contentType,
      file_size: attachment.size,
      file_data: new Buffer(attachment.content.data)
    })

    await Receipt.forge({
      team_id: req.team.get('id'),
      [foreign_key]: item.get('id'),
      delta: index + 1,
      asset_id: asset.get('id')
    }).save(null, {
      transacting: req.trx
    })

  })

  const story_id = await _findOrCreateStoryId('imported', req.trx)

  await Audit.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    auditable_type: `finance_${meta.type}`,
    auditable_id: item.get('id'),
    story_id
  }).save(null, {
    transacting: req.trx
  })

  await socket.in(`/admin/users/${req.user.get('id')}`).emit('message', {
    target: '/admin/finance/items',
    action: 'refresh',
    data: null
  })

}

const _getModel = (type) => {
  if(type === 'expenses') return Expense
  if(type === 'reimbursements') return Reimbursement
  if(type === 'checks') return Check
}

const _findOrCreateStoryId = async (text, trx) => {
  if(!text) return null
  const findStory = await Story.where({ text }).fetch({ transacting: trx })
  const story = findStory || await Story.forge({ text }).save(null, { transacting: trx })
  return story.id
}

const receiptMailbox = {
  pattern: EMAIL_REGEX,
  receiver,
  processor
}

export default receiptMailbox
