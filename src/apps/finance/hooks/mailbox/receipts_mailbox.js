import generateCode from '@core/utils/generate_code'
import socket from '@core/services/routes/emitter'
import { createAsset } from '@apps/maha/services/assets'
import { sendEmail } from '@apps/maha/services/emails'
import Reimbursement from '@apps/finance/models/reimbursement'
import Story from '@apps/maha/models/story'
import Audit from '@apps/maha/models/audit'
import Expense from '@apps/finance/models/expense'
import Receipt from '@apps/finance/models/receipt'
import Check from '@apps/finance/models/check'
import pluralize from 'pluralize'
import moment from 'moment'

const ADDRESS_REGEX = /^(expenses|reimbursements|checks)/

const models = {
  expenses: Expense,
  reimbursements: Reimbursement,
  checks: Check
}

const _findOrCreateStoryId = async (text, trx) => {
  if(!text) return null
  const findStory = await Story.query(qb => {
    qb.where('text', text)
  }).fetch({
    transacting: trx
  })
  const story = findStory || await Story.query(qb => {
    qb.where('text', text)
  }).save(null, {
    transacting: trx
  })
  return story.id
}

const _processEmail = async (req, { type, incoming_email }) => {

  const foreign_key = `${pluralize.singular(type)}_id`

  const date = type === 'checks' ? 'date_needed' : 'date'

  if(!req.user) {
    await sendEmail(req, {
      team_id: req.team.get('id'),
      from: req.team.get('rfc822'),
      to: incoming_email.get('from'),
      template: 'finance:item',
      maha: true,
      subject: 'Invalid User',
      data: {
        message: `<p>${incoming_email.get('from')} is not a valid user for team ${req.team.get('title')}</p>`
      }
    })
  }

  const code = await generateCode(req, {
    table: `finance_${type}`
  })

  const item = await models[type].forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    status: 'incomplete',
    [date]: moment(),
    code,
    description: incoming_email.get('subject')
  }).save(null, {
    transacting: req.trx
  })

  const file_name = incoming_email.get('subject').replace(/[^0-9a-zA-Z-.]/img, '-').replace(/-{2,}/g, '-').toLowerCase()

  if(incoming_email.get('html')) {
    const asset = await createAsset(req, {
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      source: 'email',
      file_name: `${file_name}.html`,
      content_type: 'text/html',
      file_data: incoming_email.get('html')
    })
    await Receipt.forge({
      team_id: req.team.get('id'),
      [foreign_key]: item.get('id'),
      delta: 0,
      asset_id: asset.get('id')
    }).save(null, {
      transacting: req.trx
    })
  }

  await Promise.mapSeries(incoming_email.related('attachments').toArray(), async (attachment, index) => {
    await Receipt.forge({
      team_id: req.team.get('id'),
      [foreign_key]: item.get('id'),
      delta: index + (incoming_email.get('html') ? 1 : 0),
      asset_id: attachment.get('id')
    }).save(null, {
      transacting: req.trx
    })
  })

  const story_id = await _findOrCreateStoryId('imported', req.trx)

  await Audit.forge({
    team_id: req.team.get('id'),
    user_id: req.user.get('id'),
    auditable_type: `finance_${type}`,
    auditable_id: item.get('id'),
    story_id
  }).save(null, {
    transacting: req.trx
  })

  await socket.refresh(req, {
    channel: 'user',
    target: '/admin/finance/items'
  })

  return item

}

const processor = async (req, { incoming_email }) => {

  const matches = incoming_email.get('to').match(ADDRESS_REGEX)

  const type = matches[1]

  const singular = pluralize.singular(type)

  try {

    const item = await _processEmail(req, {
      incoming_email,
      type
    })

    return await sendEmail(req, {
      team_id: req.team.get('id'),
      from: req.team.get('rfc822'),
      to: incoming_email.get('from'),
      template: 'finance:item',
      maha: true,
      subject: `Successfully received your ${singular}`,
      data: {
        message: `
          <p>
            Your ${singular} is now available
            <a href="${process.env.ADMIN_HOST}${item.get('object_url')}">
              here
            </a>
          </p>
        `
      }
    })

  } catch(err) {

    return await sendEmail(req, {
      team_id: req.team.get('id'),
      from: req.team.get('rfc822'),
      to: incoming_email.get('from'),
      template: 'finance:item',
      maha: true,
      subject: `Unable to accept your ${singular}`,
      data: {
        message: `Unable to accept your ${singular}`
      }
    })

  }

}

const receiptMailbox = {
  pattern: ADDRESS_REGEX,
  processor
}

export default receiptMailbox
