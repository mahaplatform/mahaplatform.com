import { updateRelated } from '@core/services/routes/relations'
import collectObjects from '@core/utils/collect_objects'
import { sendMail } from '@core/services/email'
import IncomingEmail from '@apps/maha/models/incoming_email'
import { s3 } from '@core/vendor/aws'
import { createAsset } from '../assets'
import Team from '@apps/maha/models/team'
import User from '@apps/maha/models/user'
import moment from 'moment'

const mailboxes = collectObjects('hooks/mailbox/*_mailbox.js')

const ADDRESS_REGEX = new RegExp(`^(.*)@(.*).${process.env.DOMAIN}$`)

const simpleParser = Promise.promisify(require('mailparser').simpleParser)

const sendResponse = async({ to, subject, message }) => {
  return await sendMail({
    from: 'Maha <mailer@mahaplatform.com>',
    to,
    subject,
    html: message
  })
}

const process_email = async(req, { email }) => {

  const parsed = await simpleParser(email.Body)

  const { from, to, date, subject, text, html, textAsHtml, attachments } = parsed

  const recipient = to.value.find(recipient => {
    return ADDRESS_REGEX.test(recipient.address) !== undefined
  })

  const matches = recipient.address.match(ADDRESS_REGEX)

  req.team = await Team.query(qb => {
    qb.where('subdomain', matches[2])
  }).fetch({
    transacting: req.trx
  })

  if(!req.team) {
    return await sendResponse({
      to: from.value[0].address,
      subject: 'Invalid mailbox',
      message: `${recipient.address} is not a valid mailbox`
    })
  }

  req.user = await User.query(qb => {
    qb.where('team_id', req.team.get('id'))
    qb.where('email', from.value[0].address)
  }).fetch({
    transacting: req.trx
  })

  const incoming_email = await IncomingEmail.forge({
    team_id: req.team.get('id'),
    user_id: req.user ? req.user.get('id') : null,
    from: from.value[0].address,
    to: recipient.address,
    date: moment(date),
    subject,
    html: html || textAsHtml,
    text
  }).save(null, {
    transacting: req.trx
  })

  if(attachments) {

    const attachment_ids = await Promise.mapSeries(attachments, async(attachment) => {
      return await createAsset(req, {
        team_id: req.team.get('id'),
        user_id: req.user ? req.user.get('id') : null,
        source: 'email',
        file_size: attachment.size,
        file_name: attachment.filename,
        file_data: attachment.content,
        content_type: attachment.contentType
      }).then(asset => asset.get('id'))
    })

    await updateRelated(req, {
      object: incoming_email,
      related: 'attachments',
      table: 'maha_incoming_email_attachments',
      ids: attachment_ids,
      foreign_key: 'incoming_email_id',
      related_foreign_key: 'asset_id'
    })

  }

  await incoming_email.load(['attachments','user'], {
    transacting: req.trx
  })

  const mailbox = mailboxes.find(mailbox => {
    return mailbox.default.pattern.test(matches[1])
  })

  if(!mailbox) {
    return await sendResponse({
      to: from.value[0].address,
      subject: 'Invalid mailbox',
      message: `${recipient.address} is not a valid mailbox`
    })
  }

  await mailbox.default.processor(req, {
    incoming_email
  })

}

const receive_email = async (req, { message_id }) => {

  const email = await s3.getObject({
    Bucket: process.env.AWS_BUCKET,
    Key: `emails/${message_id}`
  }).promise()

  await process_email(req, {
    email
  })

}

export default receive_email
