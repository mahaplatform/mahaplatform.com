import { createAsset } from '../../maha/services/assets'
import Source from '../../maha/models/source'
import Story from '../../maha/models/story'
import Audit from '../../maha/models/audit'
import User from '../../maha/models/user'
import socket from '../../../core/services/emitter'
import Reimbursement from '../models/reimbursement'
import Expense from '../models/expense'
import Receipt from '../models/receipt'
import Check from '../models/check'
import pluralize from 'pluralize'
import moment from 'moment'

const EMAIL_REGEX = /^(expenses|reimbursements|checks)@mahaplatform.com$/

const receiver = async (to, email, trx) => {

  const user = await User.query(qb => {
    qb.whereRaw('(email=? OR secondary_email=?)', [
      email.from.value[0].address,
      email.from.value[0].address
    ])
  }).fetch({
    transacting: trx
  })

  if(!user) throw new Error('invalid sender')

  return {
    type: to.match(EMAIL_REGEX)[1],
    user_id: user.get('id')
  }

}

const processor = async (meta, email, trx) => {

  const user = await User.where({
    id: meta.user_id
  }).fetch({
    transacting: trx
  })

  const model = _getModel(meta.type)

  const foreign_key = `${pluralize.singular(meta.type)}_id`

  const date = meta.type === 'checks' ? 'date_needed' : 'date'

  const item = await model.forge({
    team_id: user.get('team_id'),
    user_id: user.get('id'),
    status_id: 1,
    [date]: moment(),
    description: email.subject
  }).save(null, {
    transacting: trx
  })

  const file_name = email.subject.replace(/[^0-9a-zA-Z-.]/img, '-').replace(/-{2,}/g, '-').toLowerCase()

  const source = await Source.where({
    text: 'email'
  }).fetch({
    transacting: trx
  })

  const asset = await createAsset({ trx }, {
    team_id: user.get('team_id'),
    user_id: user.get('id'),
    source_id: source.get('id'),
    file_name: `${file_name}.html`,
    content_type: 'text/html',
    file_data: email.html || email.textAsHtml
  })

  await Receipt.forge({
    team_id: user.get('team_id'),
    [foreign_key]: item.get('id'),
    delta: 0,
    asset_id: asset.get('id')
  }).save(null, {
    transacting: trx
  })

  await Promise.mapSeries(email.attachments, async (attachment, index) => {

    const asset = await createAsset({ trx }, {
      team_id: user.get('team_id'),
      user_id: user.get('id'),
      source_id: source.get('id'),
      file_name: attachment.filename,
      content_type: attachment.contentType,
      file_size: attachment.size,
      file_data: new Buffer(attachment.content.data)
    })

    await Receipt.forge({
      team_id: user.get('team_id'),
      [foreign_key]: item.get('id'),
      delta: index + 1,
      asset_id: asset.get('id')
    }).save(null, {
      transacting: trx
    })

  })

  const story_id = await _findOrCreateStoryId('imported', trx)

  await Audit.forge({
    team_id: user.get('team_id'),
    user_id: user.get('id'),
    auditable_type: `expenses_${meta.type}`,
    auditable_id: item.get('id'),
    story_id
  }).save(null, {
    transacting: trx
  })

  await socket.in(`/admin/users/${user.get('id')}`).emit('message', {
    target: '/admin/expenses/items',
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
